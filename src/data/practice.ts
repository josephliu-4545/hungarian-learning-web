import type { ModuleId } from '../types'
import { PREVIEW_VOCABULARY } from './curriculum'
import { COUNTRY_FORMS, PLURAL_FORMS } from './expandedVocabulary'

export type Exercise = {
  id: string; prompt: string; instruction: string; answers: readonly string[]; explanation: string
  kind: 'choice' | 'typed' | 'clock'; distractors?: readonly string[]; page: number
  audioId?: string; clock?: readonly [number, number]
}
export type PracticeTopic = { id: string; title: string; description: string; lesson: string; exercises: Exercise[]; reference?: 'countries' | 'plurals' }
const word = (id: string) => {
  const item = PREVIEW_VOCABULARY.find((candidate) => candidate.id === id)
  if (!item) throw new Error('Missing practice vocabulary: ' + id)
  return item
}
const choose = (id: string, prompt: string, instruction: string, answer: string, distractors: readonly string[], explanation: string, page: number, audioId?: string): Exercise =>
  ({ id, kind: 'choice', prompt, instruction, answers: [answer], distractors, explanation, page, audioId })
const typed = (id: string, prompt: string, instruction: string, answer: string, explanation: string, page: number, audioId?: string, alternatives: readonly string[] = []): Exercise =>
  ({ id, kind: 'typed', prompt, instruction, answers: [answer, ...alternatives], explanation, page, audioId })
const reply = (id: string, promptId: string, answerId: string, distractorIds: string[], context: string, page: number): Exercise =>
  choose(id, word(promptId).hungarian, context, word(answerId).hungarian, distractorIds.map((other) => word(other).hungarian), word(answerId).english, page, answerId)

const greetings: PracticeTopic = { id: 'greeting-dialogue', title: 'Everyday conversations', description: 'Choose a natural reply for a specific situation.', lesson: 'Use polite greetings in formal situations. Szia is informal and addresses one person; Sziasztok addresses more than one.', exercises: [
  choose('g-1', 'You meet a teacher at 8 a.m.', 'Choose the polite greeting.', 'Jó reggelt', ['Jó estét', 'Jó éjszakát', 'Köszönöm'], 'Jó reggelt means good morning.', 2, 'greetings-jo-reggelt'),
  choose('g-2', 'Köszönöm szépen.', 'Choose a reply to thanks.', 'Szívesen', ['Jó reggelt', 'Egy pillanat', 'Sajnos nem értem'], 'Szívesen means you are welcome; Nincs mit is another possible reply.', 3, 'greetings-szivesen'),
  choose('g-3', 'Someone speaks too quickly.', 'Politely ask them to slow down.', 'Lassabban, kérem', ['Jó napot', 'Nagyon örülök', 'Viszontlátásra'], 'Lassabban = more slowly; kérem = please.', 2, 'greetings-lassabban-kerem'),
  choose('g-4', 'You greet two friends.', 'Choose the informal plural greeting.', 'Sziasztok', ['Jó éjszakát', 'Köszönöm', 'Egy pillanat'], 'Sziasztok is the informal greeting for multiple people.', 2, 'greetings-sziasztok'),
  typed('g-5', 'Unfortunately, I do not understand.', 'Write the phrase in Hungarian.', 'Sajnos nem értem', 'Értem means I understand; nem makes it negative.', 2, 'greetings-sajnos-nem-ertem'),
]}
const introduction: PracticeTopic = { id: 'introductions-dialogue', title: 'Introduce yourself', description: 'Match questions to a fictional student’s answers.', lesson: 'Formal questions often use third-person verb forms. These are example answers, not personal information about the learner.', exercises: [
  reply('i-1','introductions-hany-eves','introductions-extra-age-example',['introductions-extra-origin-example','introductions-extra-study-example','introductions-extra-language-example'],'The fictional student is 18. Choose their reply.',3),
  reply('i-2','introductions-honnan-jon','introductions-extra-origin-example',['introductions-extra-age-example','introductions-extra-nursing-student','introductions-extra-jol-vagyok'],'The fictional student is from Myanmar. Choose their reply.',3),
  reply('i-3','introductions-mi-a-nemzetisege','introductions-extra-nationality-example',['introductions-extra-age-example','introductions-extra-study-example','introductions-extra-jol-vagyok'],'Choose the answer giving nationality.',3),
  reply('i-4','introductions-mi-a-foglalkozasa','introductions-extra-nursing-student',['introductions-extra-origin-example','introductions-extra-location-example','introductions-extra-language-example'],'The fictional student studies nursing.',4),
  reply('i-5','introductions-hol-tanul','introductions-extra-study-example',['introductions-extra-origin-example','introductions-extra-age-example','introductions-extra-jol-vagyok'],'The fictional student studies at Semmelweis University.',4),
  reply('i-6','introductions-milyen-nyelven-beszel','introductions-extra-language-example',['introductions-extra-age-example','introductions-extra-nursing-student','introductions-extra-location-example'],'Choose the answer describing spoken languages.',4),
  reply('i-7','introductions-hol-el-most','introductions-extra-location-example',['introductions-extra-study-example','introductions-extra-nationality-example','introductions-extra-jol-vagyok'],'The fictional student lives in Budapest.',4),
]}
const countries: PracticeTopic = { id: 'countries', title: 'Countries and vowel harmony', description: 'Practise nationality adjectives and origin suffixes.', reference: 'countries', lesson: 'Back vowels: a, á, o, ó, u, ú. Front vowels: e, é, i, í, ö, ő, ü, ű. Suffixes often follow vowel harmony, but mixed-vowel words and place names require learning the established forms. -ból/-ből means from inside; -ról/-ről is used with particular places, including Magyarország.', exercises: COUNTRY_FORMS.flatMap(([id,place,en,adj,, ,origin]) => [
  typed('country-adj-'+id, place, 'Write the Hungarian nationality or place adjective.', adj, en + ': ' + adj, 6, 'introductions-adjective-'+id),
  typed('country-origin-'+id, place, 'Write the Hungarian form meaning “from this place”.', origin, 'The established origin form is ' + origin + '.', 6, 'introductions-origin-'+id),
])}
const suffixes: PracticeTopic = { id: 'language-suffixes', title: 'Language endings and articles', description: 'Practise -ul/-ül and a/az.', lesson: 'Use a before a consonant sound and az before a vowel sound. Language adverbs often end in -ul or -ül; learn the actual form with each language.', exercises: [
  ...(['hungarian','german','french','english','burmese','arabic','chinese','indonesian','japanese','greek','turkish','slovak'].map(id => {
    const item = word('introductions-language-'+id)
    return typed('language-'+id, item.english, 'Complete: Beszélek … (write only the language form).', item.hungarian, 'Beszélek ' + item.hungarian + '.', 6, item.id)
  })),
  choose('article-1','___ orvos','Choose the definite article.','az',['a'],'Orvos starts with a vowel sound.',6),
  choose('article-2','___ kórház','Choose the definite article.','a',['az'],'Kórház starts with a consonant sound.',6),
  choose('article-3','___ egyetem','Choose the definite article.','az',['a'],'Egyetem starts with a vowel sound.',6),
]}
const clockQuestions: Exercise[] = [
  ['half-eleven','fél tizenegy','10:30',10,30,'numbers-time-extra-fel-tizenegy',9],
  ['quarter-ten','negyed tíz','09:15',9,15,'numbers-time-extra-delelott-negyed-tiz',9],
  ['half-twelve','fél tizenkettő','11:30',11,30,'numbers-time-extra-fel-tizenketto',11],
  ['quarter-four','délután negyed négy','15:15',15,15,'numbers-time-extra-delutan-negyed-negy',11],
  ['half-seven','délután fél hét','18:30',18,30,'numbers-time-extra-delutan-fel-het',11],
  ['three-quarter-six','reggel háromnegyed hat','05:45',5,45,'numbers-time-extra-reggel-haromnegyed-hat',11],
  ['three-quarter-eleven','este háromnegyed tizenegy','22:45',22,45,'numbers-time-extra-este-haromnegyed-tizenegy',11],
].map(([id,prompt,answer,h,m,audioId,page]) => ({id: 'time-'+id, prompt:String(prompt), instruction: 'Enter the time in digits (HH:MM). If no time of day is stated, use the morning clock.', answers:[String(answer)], explanation: String(prompt)+' = '+answer+'. Hungarian fractions refer to the upcoming hour.', kind:'clock', clock:[Number(h),Number(m)], page:Number(page), audioId: id === 'quarter-ten' ? undefined : String(audioId)}))
const times: PracticeTopic = { id: 'clock', title: 'Read the clock', description: 'Convert Hungarian expressions to digital time.', lesson: 'Negyed tíz = 9:15, fél tíz = 9:30, háromnegyed tíz = 9:45. The fraction refers to the next hour, not the current one.', exercises: clockQuestions }
const schedule: PracticeTopic = {id:'schedule',title:'Schedules and time suffixes',description:'Practise from, until, and at a time.',lesson:'-kor means at a time; -tól/-től means from; -ig means until.',exercises:[
  typed('s-1','from eight','Write the Hungarian expression.','nyolctól','Nyolc + tól = from eight.',10,'numbers-time-extra-nyolctol',['nyolc órától']),
  typed('s-2','until seven','Write the Hungarian expression.','hétig','Hét + ig = until seven.',10,'numbers-time-extra-hetig',['hét óráig']),
  typed('s-3','at twelve','Write the Hungarian expression.','tizenkettőkor','Use -kor for at a time.',10,'numbers-time-extra-tizenkettokor',['tizenkét órakor']),
  typed('s-4','at noon','Write the Hungarian expression.','délben','Délben is the established form for at noon.',10,'numbers-time-extra-delben'),
  choose('s-5','Hány órától?', 'Choose the meaning.', 'From what time?', ['Until what time?','What time is it?','At what time?'],'-tól asks for a starting time.',8,'numbers-time-extra-hany-oratol'),
  choose('s-6','Hány óráig?', 'Choose the meaning.', 'Until what time?', ['From what time?','What time is it?','At what time?'],'-ig asks for an ending time.',8,'numbers-time-extra-hany-oraig'),
]}
const conjugation: PracticeTopic = {id:'consultation-verbs',title:'Consultation verb forms',description:'Fill in forms of rendel in a medical context.',lesson:'Rendel can mean to hold consultations in a medical context. én rendelek, te rendelsz, Ön/ő rendel. Formal Ön uses the third person.',exercises:[
  typed('v-1','én ___','Complete with the correct form of rendel.','rendelek','First person singular: rendelek.',11,undefined,['én rendelek']),
  typed('v-2','te ___','Complete with the correct form of rendel.','rendelsz','Informal second person singular: rendelsz.',11,undefined,['te rendelsz']),
  typed('v-3','Ön ___','Complete with the correct form of rendel.','rendel','Formal second person takes third-person grammar.',11,undefined,['Ön rendel']),
  typed('v-4','ő ___','Complete with the correct form of rendel.','rendel','Third person singular: rendel.',11,undefined,['ő rendel']),
  choose('v-5','Hány órától hány óráig rendel a gyermekorvos?', 'Choose the meaning.', 'From what time to what time does the pediatrician hold consultations?', ['Where is the pediatric ward?','What is the pediatrician’s name?','How old is the patient?'],'Hány órától ... hány óráig asks for a time range.',11,'appointments-extra-gyermekorvos-schedule'),
]}
const plural: PracticeTopic = {id:'plural',title:'Singular to plural',description:'Type the plural of hospital vocabulary.',reference:'plurals',lesson:'The Hungarian plural ends in -k. Many nouns require a linking vowel, and final a/e usually lengthens to á/é. Some stems change, such as kémcső → kémcsövek. Learn the whole form.',exercises: PLURAL_FORMS.map(([id,singular,plural,english]) => typed('plural-'+id,singular,'Write the plural in Hungarian.',plural,plural+' = '+english+'.',14,'hospital-objects-plural-'+id))}
const ward: PracticeTopic = {id:'ward',title:'In the patient room',description:'Practise van, nincs and simple questions.',lesson:'Van means there is; vannak means there are. Nincs means there is not. Answer the given fictional situation, not an actual clinical situation.',exercises:[
  choose('w-1','Van hőmérő a kórteremben?', 'The thermometer is present. Choose a reply.', 'Igen, van.', ['Sajnos nincs.','Az elsőn.','Ott balra.'],'Igen, van = yes, there is.',13,'hospital-objects-extra-igen-van'),
  choose('w-2','Van hőmérő a kórteremben?', 'The thermometer is absent. Choose a reply.', 'Sajnos nincs.', ['Igen, van.','A másodikon.','Ott balra.'],'Sajnos nincs = unfortunately, there is not.',13,'hospital-objects-extra-sajnos-nincs'),
  typed('w-3','There is an emesis basin in the patient room.','Write the Hungarian sentence.','Van egy vesetál a kórteremben.','Van introduces the object; -ben means in.',13,'hospital-objects-extra-van-vesetal',['A kórteremben van egy vesetál.']),
  typed('w-4','There is no ampoule in the patient room.','Write the Hungarian sentence.','Nincs ampulla a kórteremben.','Nincs is the negative existence verb.',13,'hospital-objects-extra-nincs-ampulla',['A kórteremben nincs ampulla.']),
  choose('w-5','Mik vannak a képen?', 'Choose the meaning.', 'What things are in the picture?', ['Who works in the hospital?','Where is the lift?','What time is it?'],'Mik and vannak are plural forms.',13,'hospital-objects-extra-mik-vannak-kepen'),
]}
const directions: PracticeTopic = {id:'directions',title:'Hospital directions',description:'Follow a fictional hospital dialogue.',lesson:'Hányadik emeleten asks which floor. Az elsőn means on the first floor; A másodikon means on the second. Balra means to the left. This is an example, not a real hospital map.',exercises:[
  reply('d-1','hospital-objects-extra-hanyadik-emelet','hospital-objects-extra-az-elson',['hospital-objects-extra-a-masodikon','hospital-objects-extra-ott-balra','hospital-objects-extra-nincs'],'In this example, the lab is on the first floor.',15),
  reply('d-2','hospital-objects-extra-es-ct','hospital-objects-extra-a-masodikon',['hospital-objects-extra-az-elson','hospital-objects-extra-ott-balra','hospital-objects-extra-nincs'],'In this example, CT is on the second floor.',15),
  reply('d-3','hospital-objects-extra-hol-lift','hospital-objects-extra-ott-balra',['hospital-objects-extra-az-elson','hospital-objects-extra-a-masodikon','hospital-objects-extra-igen'],'In this example, the lift is over there to the left.',15),
  typed('d-4','to the left','Write the Hungarian direction.','balra','Balra = to the left.',15,'hospital-objects-extra-balra'),
]}
const specialists = [
  ['sebészeten','appointments-sebesz','surgery'],['kardiológián','appointments-kardiologus','cardiology'],
  ['urológián','appointments-urologus','urology'],['belgyógyászaton','appointments-belgyogyasz','internal medicine'],
  ['nőgyógyászaton','appointments-nogyogyasz','gynecology'],['pszichiátrián','departments-extra-pszichiater','psychiatry']
] as const
const matching: PracticeTopic = {id:'specialists',title:'Departments and specialists',description:'Match hospital departments with the appropriate specialist.',lesson:'A sebészet is the surgery department; a sebész is the surgeon. These matching questions are authored practice based on pages 11 and 17. They are not verbatim source dialogues.',exercises:specialists.map(([place,id,en],i)=>choose('match-'+i,'Ki dolgozik a '+place+'?', 'Choose the specialist associated with '+en+'.',word(id).hungarian,specialists.filter(([,other])=>other!==id).slice(0,3).map(([,other])=>word(other).hungarian),word(id).english+' works in '+en+'.',17,id))}
const roleplay: PracticeTopic = {id:'roleplay',title:'Doctor–patient introduction',description:'Respond to a formal question in a guided scenario.',lesson:'Role-play using a fictional patient profile. These are authored examples for language learning, not medical advice. Say your answer aloud before selecting it.',exercises:[
  reply('r-1','introductions-hany-eves','introductions-extra-age-example',['introductions-extra-jol-vagyok','introductions-extra-nationality-example','introductions-extra-origin-example'],'Patient is 18. Respond to the doctor.',17),
  reply('r-2','introductions-extra-hogy-van','introductions-extra-jol-vagyok',['introductions-extra-age-example','introductions-extra-origin-example','introductions-extra-nursing-student'],'Patient feels well. Respond to the doctor.',17),
  reply('r-3','introductions-honnan-jon','introductions-extra-origin-example',['introductions-extra-age-example','introductions-extra-study-example','introductions-extra-jol-vagyok'],'Patient comes from Myanmar.',17),
]}
export const PRACTICE_TOPICS: Readonly<Record<ModuleId, readonly PracticeTopic[]>> = {
  greetings:[greetings], introductions:[introduction,countries,suffixes], 'numbers-time':[times,schedule], appointments:[conjugation], 'hospital-objects':[plural,ward,directions], departments:[matching,roleplay],
}
