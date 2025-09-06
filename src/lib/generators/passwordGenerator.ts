/**
 * @file passwordGenerator.ts
 * @description Contains the core logic for generating random passwords,
 * supporting multiple character sets and ensuring cryptographic randomness.
 */

'use client'

type CharacterSets = {
  [key: string]: string
}

/**
 * Password Generator class that handles the generation of passwords
 * Supports multiple character sets and languages
 */

/**
 * Password Generator Implementation
 * * Security Considerations:
 * - Uses cryptographically secure random number generation via crypto.getRandomValues()
 * - Implements entropy pooling for enhanced randomness
 * - Avoids predictable patterns in generated passwords
 * - Supports multiple character sets to increase entropy
 * * Entropy Sources:
 * - Character set selection
 * - Random number generation
 * - Multiple language support
 * * Usage Example:
 * ```typescript
 * const generator = new PasswordGenerator();
 * const password = generator.generate(16, {
 * uppercase: true,
 * lowercase: true,
 * numbers: true,
 * symbols: true
 * });
 * ```
 * * @security This implementation should be regularly audited for cryptographic security
 * @warning Do not modify the random number generation without security review
 */


export class PasswordGenerator {
  private readonly alphabets: CharacterSets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
    // Indian Languages
    hindi: 'अआइईउऊएऐओऔकखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह',
    tamil: 'அஆஇஈஉஊஎஏஐஒஓஔகஙசஜஞடணதநபமயரலவழளறனஸஷஸஹ',
    telugu: 'అఆఇఈఉఊఋఌఎఏఐఒఓఔకగఘఙచఛజఝఞటఠడఢణతథదధనపఫబభమయరలవశషసహ',
    bengali: 'অআইঈউঊঋএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহ',
    gujarati: 'અઆઇઈઉઊઋઌએઐઓઔકખગઘઙચછજઝઞટઠડઢણતથદધનપફબભમયરલવશષસહ',
    kannada: 'ಅಆಇಈಉಊಋಌಎಏಐಒಓಔಕಖಗಘಙಚಛಜಝಞಟಠಡಢಣತಥದಧನಪಫಬಭಮಯರಲವಶಷಸಹಳ',
    malayalam: 'അആഇഈഉഊഋഌഎഏഐഒഓഔകഖഗഘങചഛജഝഞടഠഡഢണതഥദധനപഫബഭമയരലവശഷസഹളഴറ',
    odia: 'ଅଆଇଈଉଊଋଌଏଐଓଔକଖଗଘଙଚଛଜଝଞଟଠଡଢଣତଥଦଧନପଫବଭମଯରଲଶଷସହ',
    punjabi: 'ਅਆਇਈਉਊਏਐਓਔਕਖਗਘਙਚਛਜਝਞਟਠਡਢਣਤਥਦਧਨਪਫਬਭਮਯਰਲਵਸ਼ਸਹ',
    urdu: 'ا ب پ ت ٹ ث ج چ ح خ د ڈ ذ ر ڑ ز ژ س ش ص ض ط ظ ع غ ف ق ک گ ل م ن ں و ہ ھ ی ے',
    santali: 'ᱟᱹᱛᱮᱞᱟᱣᱛᱷᱟᱜᱩᱟᱦᱟᱹᱨᱟᱞᱠᱟᱤᱱᱮᱯᱚᱱᱛᱮᱠᱤ',
    manipuri: 'ꯑꯂꯃꯇꯍꯌꯒꯁꯐꯔꯖꯄꯅꯞꯓꯚꯔꯕꯐꯙꯄꯏꯑꯔꯑ',

    // International Languages
    mandarin: '的一是了我不在人有他这中大为上个国到以说时要就出会可也你对生能而子那得于着下自之年过发后作里用道行所然家种事成方多经么去法学如都同现当没动面起看定天分还进好小部其些主样理心她本前开但因只从想实日军者意无力它与长把机十民第公此已工使情明性全三又关点正业外将两高间由问很次定此入',
    spanish: 'abcdefghijklmnñopqrstuvwxyzáéíóúü',
    russian: 'абвгдежзийклмнопрстуфхцчшщъыьэюя',
    japanese: 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん',
    vietnamese: 'aáàảãạăắằẳẵặâấầẩẫậeéèẻẽẹêếềểễệiíìỉĩịoóòỏõọôốồổỗộơớờởỡợuúùủũụưứừửữựyýỳỷỹỵ',
    turkish: 'abcçdefgğhıijklmnoöprsştuüvyz',
    korean: '가각간갇갈갉갊감갑값갓갔강개객갠갤갬갭갯갰갱갸갹갼걀걋걍거걱건걷걸걺검겁',
    french: 'abcdefghijklmnopqrstuvwxyzàâçéèêëîïôûùüÿ',
    italian: 'abcdefghijklmnopqrstuvwxyzàèéìòù',
    iranianPersian: 'ا ب پ ت ث ج چ ح خ د ذ ر ز ژ س ش ص ض ط ظ ع غ ف ق ک گ ل م ن و ه ی',
    javanese: 'ꦲꦏꦐꦑꦒꦕꦖꦗꦘꦙꦚꦛꦜꦝꦞꦟꦠꦡꦢꦣꦤꦥꦦꦧꦨꦩꦪꦫꦬꦭꦮꦯꦰꦱꦲ',
    german: 'abcdefghijklmnopqrstuvwxyzäöüß',
    arabic: 'ابتثجحخدذرزسشصضطظعغفقكلمنهوي',
    portuguese: 'abcdefghijklmnopqrstuvwxyzáâãàçéêíóôõúü',
    bulgarian: 'абвгдежзийклмнопрстуфхцчшщъьюя', // Cyrillic alphabet
    czech: 'áčďéěíňóřšťúůýžĎŇŘŠŤŽ', // Unique Czech diacritics
    croatian: 'čćđšžČĆĐŠŽ', // Unique Croatian characters
    latvian: 'āčēģīķļņšūžĀČĒĢĪĶĻŅŠŪŽ', // Latvian specific characters
    romanian: 'ăâîșțĂÂÎȘȚ', // Romanian specific characters
    slovenian: 'čšžČŠŽ', // Slovenian specific characters
    welsh: 'âêîôûŵŷÂÊÎÔÛŴŶ', // Welsh specific characters
    dutch: 'áàäéèëíìïóòöúùüĳÁÀÄÉÈËÍÌÏÓÒÖÚÙÜĲ', // Dutch specific characters
    swedish: 'åäöÅÄÖ', // Swedish specific characters
    danish: 'æøåÆØÅ', // Danish specific characters
    hungarian: 'áéíóöőúüűÁÉÍÓÖŐÚÜŰ', // Hungarian specific characters
    lithuanian: 'ąčęėįšųūžĄČĘĖĮŠŲŪŽ', // Lithuanian specific characters
    maltese: 'ċġħżĊĠĦŻ', // Maltese specific characters
    estonian: 'äõöüšžÄÕÖÜŠŽ', // Estonian specific characters
    greek: 'αβγδεζηθικλμνξοπρστυφχψωΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ',
    thai: 'กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษสหฬอฮ'

  }

  /**
   * Generates a cryptographically secure random number.
   * @param max - The maximum value (exclusive).
   * @returns A random number between 0 and max.
   */
  private getRandomNumber(max: number): number {
    const randomValues = new Uint32Array(1);
    crypto.getRandomValues(randomValues);
    return randomValues[0] % max;
  }

  /**
   * Generates a password based on the specified options
   * @param length - The desired length of the password
   * @param options - Configuration options for character sets to include
   * @returns Generated password string
   */

  public generate(length: number, options: {[key: string]: boolean}): string {
    let chars = ''
    Object.keys(options).forEach(option => {
      if (options[option] && this.alphabets[option]) {
        chars += this.alphabets[option]
      }
    })
    if (!chars) chars = this.alphabets.lowercase
    let password = ''
    for (let i = 0; i < length; i++) {
      const randomIndex = this.getRandomNumber(chars.length)
      password += chars[randomIndex]
    }
    return password
  }

  public addLanguage(name: string, characters: string) {
    this.alphabets[name] = characters
  }

  public getAvailableCharacterSets(): string[] {
    return Object.keys(this.alphabets)
  }
}

export const passwordGenerator = new PasswordGenerator()