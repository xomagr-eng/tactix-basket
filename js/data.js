/* ============================================================
   TACTIX BASKET — Βάση Γνώσης (Seed Data)
   Coordinate system γηπέδου: x 0..100 (αριστερά→δεξιά),
   y 0..100 (μεσαία γραμμή=0, καλάθι=100). Επίθεση προς τα πάνω.
   Θέσεις: PG=Πλέι, SG=Σούτινγκ Γκαρντ, SF=Σμολ Φόργουορντ,
           PF=Πάουερ Φόργουορντ, C=Σέντερ.
   ============================================================ */

/* ---------- Επιθετικά & Αμυντικά Συστήματα (Σχηματισμοί) ---------- */
const FORMATIONS = {
  "5-Out (Motion)": [
    {r:"PG", x:50, y:34},
    {r:"SG", x:20, y:54}, {r:"SF", x:80, y:54},
    {r:"PF", x:8,  y:80}, {r:"C",  x:92, y:80}
  ],
  "4-Out 1-In": [
    {r:"PG", x:50, y:34},
    {r:"SG", x:20, y:56}, {r:"SF", x:80, y:56},
    {r:"PF", x:10, y:82},
    {r:"C",  x:56, y:84}
  ],
  "3-Out 2-In (High-Low)": [
    {r:"PG", x:50, y:34},
    {r:"SG", x:18, y:52}, {r:"SF", x:82, y:52},
    {r:"PF", x:40, y:66},
    {r:"C",  x:56, y:86}
  ],
  "Horns (Κέρατα)": [
    {r:"PG", x:50, y:30},
    {r:"SG", x:12, y:62}, {r:"SF", x:88, y:62},
    {r:"PF", x:38, y:60}, {r:"C",  x:62, y:60}
  ],
  "1-4 High": [
    {r:"PG", x:50, y:32},
    {r:"SG", x:16, y:58}, {r:"SF", x:84, y:58},
    {r:"PF", x:38, y:60}, {r:"C",  x:62, y:60}
  ],
  "Spread Pick & Roll": [
    {r:"PG", x:50, y:34},
    {r:"C",  x:60, y:50},
    {r:"PF", x:14, y:56},
    {r:"SG", x:8,  y:82}, {r:"SF", x:92, y:82}
  ],
  "Triangle (Τρίγωνο)": [
    {r:"PG", x:60, y:40},
    {r:"SF", x:26, y:56},
    {r:"SG", x:10, y:80},
    {r:"C",  x:36, y:84},
    {r:"PF", x:72, y:60}
  ],
  "Box (Κουτί / Στημένη)": [
    {r:"PG", x:50, y:28},
    {r:"SG", x:38, y:62}, {r:"SF", x:62, y:62},
    {r:"PF", x:38, y:85}, {r:"C",  x:62, y:85}
  ],
  "Man-to-Man (Άμυνα)": [
    {r:"PG", x:50, y:46},
    {r:"SG", x:22, y:58}, {r:"SF", x:78, y:58},
    {r:"PF", x:38, y:74}, {r:"C",  x:56, y:82}
  ],
  "2-3 Zone (Άμυνα)": [
    {r:"PG", x:36, y:52}, {r:"SG", x:64, y:52},
    {r:"SF", x:16, y:74}, {r:"PF", x:84, y:74}, {r:"C", x:50, y:83}
  ],
  "3-2 Zone (Άμυνα)": [
    {r:"SG", x:24, y:50}, {r:"PG", x:50, y:42}, {r:"SF", x:76, y:50},
    {r:"PF", x:34, y:78}, {r:"C", x:66, y:78}
  ],
  "1-3-1 Zone (Άμυνα)": [
    {r:"PG", x:50, y:40},
    {r:"SG", x:18, y:62}, {r:"PF", x:50, y:58}, {r:"SF", x:82, y:62},
    {r:"C", x:50, y:84}
  ],

  /* ---- Press ολόκληρου γηπέδου (full-court, y 0=δικό μας baseline, 100=αντίπαλο) ---- */
  "1-2-1-1 Press (Full)": [
    {r:"PG", x:50, y:88}, {r:"SG", x:26, y:78}, {r:"SF", x:74, y:78},
    {r:"PF", x:50, y:64}, {r:"C", x:50, y:40}
  ],
  "2-2-1 Press (Full)": [
    {r:"PG", x:30, y:84}, {r:"SG", x:70, y:84},
    {r:"SF", x:24, y:62}, {r:"PF", x:76, y:62}, {r:"C", x:50, y:40}
  ],
  "Full-Court Man Press": [
    {r:"PG", x:50, y:86}, {r:"SG", x:24, y:74}, {r:"SF", x:76, y:74},
    {r:"PF", x:36, y:56}, {r:"C", x:64, y:48}
  ],
  "1-2-2 Press (3/4)": [
    {r:"PG", x:50, y:82}, {r:"SG", x:28, y:68}, {r:"SF", x:72, y:68},
    {r:"PF", x:34, y:50}, {r:"C", x:66, y:50}
  ],

  /* ---- Alignments στημένων φάσεων (set plays) ---- */
  "Box BLOB (Στημένη)": [
    {r:"PG", x:50, y:99}, {r:"SG", x:38, y:80}, {r:"SF", x:62, y:80},
    {r:"PF", x:40, y:92}, {r:"C", x:60, y:92}
  ],
  "Horns ATO (Στημένη)": [
    {r:"PG", x:50, y:30}, {r:"SG", x:12, y:62}, {r:"SF", x:88, y:62},
    {r:"PF", x:38, y:60}, {r:"C", x:62, y:60}
  ],
  "Zipper SLOB (Στημένη)": [
    {r:"PG", x:96, y:58}, {r:"SG", x:50, y:88}, {r:"SF", x:50, y:66},
    {r:"PF", x:22, y:78}, {r:"C", x:64, y:84}
  ]
};

/* Συστήματα που σχεδιάζονται σε ΟΛΟΚΛΗΡΟ γήπεδο */
const FULLCOURT = ["1-2-1-1 Press (Full)","2-2-1 Press (Full)","Full-Court Man Press","1-2-2 Press (3/4)"];

const ROLE_NAMES = {
  "PG":"Πλέι Μέικερ (Point Guard)", "SG":"Σούτινγκ Γκαρντ (2)",
  "SF":"Σμολ Φόργουορντ / Πτέρυγα (3)", "PF":"Πάουερ Φόργουορντ (4)",
  "C":"Σέντερ / Πίβοτ (5)"
};

/* ---------- Υποκατηγορίες Ρόλων ανά θέση (αρχέτυπα παικτών) ---------- */
const POSITION_ROLES = {
  "PG":[
    {code:"FLR", name:"Οργανωτής (Floor General)", desc:"Pass-first, ελέγχει το τέμπο, μοιράζει, διαβάζει την άμυνα."},
    {code:"SCG", name:"Σκόρερ Πλέι (Scoring PG)", desc:"Δημιουργεί για τον εαυτό του, επικίνδυνος στο pick & roll, σουτ off-dribble."},
    {code:"CMB", name:"Combo Guard", desc:"Παίζει και στις δύο θέσεις γκαρντ, μπάλα ή off-ball."},
    {code:"3&D", name:"3&D Γκαρντ", desc:"Άμυνα στον αντίπαλο πλέι + καθαρό τρίποντο από κατάσταση."}
  ],
  "SG":[
    {code:"SHT", name:"Σουτέρ (Sharpshooter)", desc:"Καθαρός εκτελεστής, κίνηση χωρίς μπάλα, catch & shoot, off-screen."},
    {code:"SLA", name:"Διεισδυτής (Slasher)", desc:"Επιθέσεις στο καλάθι, γρήγορο πρώτο βήμα, φάουλ & finishing."},
    {code:"3&D", name:"3&D Γκαρντ", desc:"Άμυνα στον καλύτερο περιφερειακό + τρίποντο γωνίας."},
    {code:"COM", name:"Combo Scorer", desc:"Σκοράρει από παντού: on-ball, off-ball, mid-range."}
  ],
  "SF":[
    {code:"WNG", name:"Wing Scorer", desc:"Δημιουργεί μόνος του, iso, mid-range & drive, δεύτερη επιλογή."},
    {code:"3&D", name:"3&D Φόργουορντ", desc:"Αμύνεται σε πολλές θέσεις (switch) + καθαρό τρίποντο κατάστασης."},
    {code:"POR", name:"Point Forward", desc:"Χειρίζεται τη μπάλα, δημιουργεί για τους άλλους από το ψηλό."},
    {code:"STR", name:"Stretch Πτέρυγα", desc:"Ανοίγει τον χώρο με το σουτ, spacing για τους ψηλούς."}
  ],
  "PF":[
    {code:"STR", name:"Stretch 4 (Πυραυλοβόλος)", desc:"Ψηλός με τρίποντο — ανοίγει τη ρακέτα (pick & pop)."},
    {code:"ROL", name:"Roll Man (Lob Threat)", desc:"Κόβει στο καλάθι μετά το μπλόκο, αλέ-ουπ & finishing."},
    {code:"POS", name:"Post/Banger", desc:"Δουλειά στη ρακέτα, ριμπάουντ, φυσικό παιχνίδι, screens."},
    {code:"CMB", name:"Combo Forward", desc:"Παίζει 3 & 4, ευέλικτος επιθετικά και αμυντικά."}
  ],
  "C":[
    {code:"RIM", name:"Προστάτης Ρακέτας (Rim Protector)", desc:"Τάπες, drop coverage, ριμπάουντ, roll & finish στο καλάθι."},
    {code:"STR", name:"Stretch 5", desc:"Σέντερ με τρίποντο — τραβά τον αντίπαλο ψηλό έξω, pick & pop."},
    {code:"POS", name:"Πίβοτ (Back-to-Basket)", desc:"Κλασικός ψηλός, post-up, φάουλ, δουλειά με την πλάτη."},
    {code:"DHO", name:"Κόμβος Δημιουργίας (Playmaking Hub)", desc:"Δίνει από το ψηλό, hand-offs (DHO), high-low, ανάγνωση."}
  ]
};

/* ---------- Τακτικές Μεγάλων Προπονητών + δικές μου ---------- */
const TACTICS_SEED = [
{
  id:"bartzokas-oly", name:"Motion Offense & Σκληρή Άμυνα — «Ο Σκακιστής»", coach:"Γιώργος Μπαρτζώκας",
  team:"Ολυμπιακός (κάτοχος / φιναλίστ Euroleague)", system:"5-Out (Motion)", emoji:"🔴", intensity:"Πολύ Υψηλή",
  style:["Motion offense","Κυκλοφορία μπάλας","Σκληρή άμυνα","Ριμπάουντ","Πειθαρχία"],
  summary:"Δύο πυλώνες: μοίρασμα της μπάλας & δυνατή άμυνα. Ο Ολυμπιακός τρέχει motion offense με ασταμάτητη κίνηση, κοφτά cuts και ρευστές πάσες (ηγείται της Euroleague σε assisted FG% ~69%), πάνω σε μια σκληρή, πειθαρχημένη αμυντική ταυτότητα. Ο «σκακιστής» Μπαρτζώκας: καθαρή τακτική, σύνθετος μηχανισμός.",
  phases:{
    offense:[
      "Motion offense: pass & cut, drive & kick, extra pass — υψηλό assisted FG%.",
      "Ασταμάτητη κίνηση χωρίς μπάλα & καθαρά spacing — η μπάλα βρίσκει τον ελεύθερο.",
      "Pick & roll με ανάγνωση coverage (drop/switch/hedge) & post play σε mismatch.",
      "Υπομονή & εκτέλεση — καλό σουτ, όχι πρώτο σουτ· τρίποντο γωνίας."
    ],
    defense:[
      "Άμυνα ως ταυτότητα: man-to-man με ένταση & έτοιμες βοήθειες (help & recover).",
      "«Χτίζουμε τοίχο» — προστασία ρακέτας, κλείσιμο διαδρόμων penetration.",
      "Ισχυρό contest σε κάθε σουτ, χωρίς φάουλ· πίεση στον κάτοχο.",
      "Απόλυτη προτεραιότητα στο αμυντικό ριμπάουντ — box-out όλων."
    ],
    transition:[
      "Θετική: γρήγορη μεταφορά μετά το κλέψιμο/ριμπάουντ πριν στηθεί η άμυνα.",
      "Αρνητική (transition D): άμεση επιστροφή, ο πρώτος σταματά τη μπάλα.",
      "Ισορροπία επίθεσης — πάντα 1-2 παίκτες έτοιμοι για την επιστροφή."
    ],
    special:[
      "Στημένες φάσεις (ATO) υψηλής προετοιμασίας — set plays για καθαρό σουτ.",
      "Επιθετικό ριμπάουντ επιλεκτικά, χωρίς να θυσιάζεται το transition balance.",
      "Πλαγίων/βασικών (SLOB/BLOB) με καθαρές επιλογές πρώτου & δεύτερου."
    ]
  },
  movements:[
    {from:[50,34],to:[60,50],type:"run"},
    {from:[56,84],to:[46,70],type:"screen"},
    {from:[50,34],to:[20,54],type:"pass"}
  ],
  keyRoles:["Σκληρός αμυντικός πλέι","Προστάτης ρακέτας","Σουτέρ γωνίας"]
},
{
  id:"pop-spurs", name:"Motion Offense — «The Beautiful Game»", coach:"Gregg Popovich",
  team:"San Antonio Spurs", system:"5-Out (Motion)", emoji:"🖤", intensity:"Υψηλή",
  style:["Κυκλοφορία μπάλας","Ανιδιοτέλεια","Τρίποντο γωνίας","Spacing","0.5 seconds"],
  summary:"Η μπάλα βρίσκει τον ελεύθερο. Ακατάπαυστη κυκλοφορία, extra pass, drive & kick και επίθεση σε κίνηση. Ο κανόνας «0.5»: πάσα, σουτ ή ντρίμπλα σε μισό δευτερόλεπτο — καμία στάση.",
  phases:{
    offense:[
      "Motion με reads: pass & cut, drive & kick, ανιδιοτελής κυκλοφορία.",
      "Κανόνας «0.5»: αποφασίζεις σε μισό δευτ. — πάσα/σουτ/ντρίμπλα, ποτέ στάση.",
      "Στόχος το τρίποντο γωνίας (corner three) — η πιο αποδοτική επιλογή.",
      "Drive & kick: η διείσδυση «σπάει» την άμυνα, το extra pass βρίσκει τον καθαρό."
    ],
    defense:[
      "Στέρεο man-to-man με πειθαρχία, «no middle» — σπρώχνεις τον κάτοχο έξω.",
      "Βοήθειες έγκαιρες & recover στον δικό σου, χωρίς περιττό ρίσκο.",
      "Contain την μπάλα, προστασία ρακέτας, καθαρό αμυντικό ριμπάουντ."
    ],
    transition:[
      "Push μετά από ριμπάουντ — γρήγορη μπάλα μπροστά για early offense.",
      "Wings τρέχουν φαρδιά στις γωνίες, ο πλέι διαβάζει το πλεονέκτημα.",
      "Αν δεν υπάρχει break → ομαλή μετάβαση στο motion."
    ],
    special:[
      "Set plays με ελεγχόμενη εκτέλεση για συγκεκριμένους παίκτες (ATO).",
      "Hammer action: weak-side back screen για τρίποντο γωνίας.",
      "Πειθαρχία & εκτέλεση — «pound the rock»."
    ]
  },
  movements:[
    {from:[50,34],to:[35,55],type:"run"},
    {from:[35,55],to:[8,80],type:"pass"},
    {from:[80,54],to:[92,80],type:"run"}
  ],
  keyRoles:["Ανιδιοτελής δημιουργός","Σουτέρ γωνίας","Ευφυής ψηλός (DHO)"]
},
{
  id:"phil-triangle", name:"Triangle Offense — «Το Τρίγωνο»", coach:"Phil Jackson / Tex Winter",
  team:"Chicago Bulls / LA Lakers", system:"Triangle (Τρίγωνο)", emoji:"🔺", intensity:"Μεσαία-Υψηλή",
  style:["Τρίγωνο","Reads","Spacing","Post play","Ισορροπία"],
  summary:"Επίθεση ανάγνωσης, όχι απομνημόνευσης. Σχηματισμός τριγώνου στη μία πλευρά (ψηλός-γωνία-πτέρυγα) με ισορροπία & spacing, όπου κάθε κίνηση της άμυνας έχει αυτόματη «απάντηση». Ελευθερία μέσα σε δομή.",
  phases:{
    offense:[
      "Τρίγωνο στη strong side: ψηλός στο post, γωνία, πτέρυγα — spacing 4.5μ.",
      "Reads αντί για κλήσεις: η άμυνα «λέει» πού θα πάει η μπάλα.",
      "Δύο παίκτες στη weak side (guard–forward) για αντιστροφή & πλεονέκτημα.",
      "Post play + cutters: εσωτερικό-εξωτερικό παιχνίδι, back-cuts στα κενά."
    ],
    defense:[
      "Πίεση στην μπάλα, βοήθεια στο post, no easy paint touches.",
      "Man-to-man με σαφείς κανόνες βοήθειας & rotations.",
      "Ριμπάουντ & ισορροπία μετάβασης πριν την τελική."
    ],
    transition:[
      "Early offense: μεταφορά και άμεση είσοδος στο τρίγωνο.",
      "Sideline break — γέμισμα διαδρόμων, γρήγορη αντιστροφή."
    ],
    special:[
      "Automatics: κάθε αμυντική αντίδραση έχει προκαθορισμένη λύση.",
      "Splits & back-cuts όταν η άμυνα υπερβοηθά στο post.",
      "Εκτέλεση με υπομονή — καλό σουτ μέσα από τη ροή."
    ]
  },
  movements:[
    {from:[60,40],to:[45,55],type:"pass"},
    {from:[36,84],to:[36,84],type:"run"},
    {from:[72,60],to:[55,45],type:"run"}
  ],
  keyRoles:["Ψηλός με post & πάσα","Ευφυείς πτέρυγες (reads)","Γκαρντ σουτέρ γωνίας"]
},
{
  id:"dantoni-ssol", name:"Seven Seconds or Less — «Pace & Space»", coach:"Mike D'Antoni",
  team:"Phoenix Suns / Houston", system:"Spread Pick & Roll", emoji:"🟠", intensity:"Πολύ Υψηλή",
  style:["Ρυθμός","Spacing","Pick & Roll","Τρίποντα","Επίθεση"],
  summary:"Επίθεση σε <7''. Μέγιστος ρυθμός, μέγιστο spacing και κυρίαρχο pick & roll: ο πλέι-μαέστρος διαβάζει, ο ψηλός κόβει (roll) ή ανοίγει (pop), τέσσερα τρίποντα γύρω. Πολλές, γρήγορες, αποδοτικές κατοχές.",
  phases:{
    offense:[
      "Spread PnR: 4 σουτέρ στην περιφέρεια, μέγιστο άνοιγμα ρακέτας.",
      "Ο πλέι διαβάζει το coverage: roll, pop, skip πάσα στη γωνία, σουτ.",
      "Επίθεση σε <7'' — πριν προλάβει να στηθεί η άμυνα.",
      "Ιεράρχηση σουτ: καλάθι, τρίποντο, cut — αποφυγή του μακρινού δίποντου."
    ],
    defense:[
      "Δεχόμαστε ότι θα δώσουμε κάτι — προτεραιότητα η δική μας επίθεση.",
      "Contain PnR, κλείσιμο τριπόντου, live με τα χέρια για κλεψίματα.",
      "Γρήγορο αμυντικό ριμπάουντ → άμεσο outlet για push."
    ],
    transition:[
      "Το κλειδί: push σε κάθε κατοχή — ο πλέι τρέχει τη μπάλα άμεσα.",
      "Wings sprint στις γωνίες (lane spacing), trailer big για drag screen.",
      "Early PnR στα πρώτα δευτερόλεπτα της επίθεσης."
    ],
    special:[
      "Drag screens σε μετάβαση για άμεσο πλεονέκτημα.",
      "Quick-hitters για τον σουτέρ off-screen.",
      "Ρυθμός > στημένες: παίζουμε γρήγορα, όχι στατικά."
    ]
  },
  movements:[
    {from:[50,34],to:[62,48],type:"run"},
    {from:[60,50],to:[50,42],type:"screen"},
    {from:[60,50],to:[50,72],type:"run"}
  ],
  keyRoles:["Μαέστρος pick & roll","Roll man / lob","Τέσσερις σουτέρ"]
},
{
  id:"kerr-gsw", name:"Motion + Splits — «Spacing & Movement»", coach:"Steve Kerr",
  team:"Golden State Warriors", system:"5-Out (Motion)", emoji:"🔵", intensity:"Υψηλή",
  style:["Off-ball κίνηση","Splits","Screens","Τρίποντα","Ρυθμός"],
  summary:"Συνδυασμός Triangle & motion με ασταμάτητη κίνηση χωρίς μπάλα. Split cuts, off-ball screens και handoffs κρατούν την άμυνα σε συνεχή αγωνία — ο κορυφαίος σουτέρ βρίσκει χώρο μέσα από ένα δίχτυ μπλόκων.",
  phases:{
    offense:[
      "Ασταμάτητη off-ball κίνηση — η άμυνα δεν ξεκουράζεται ποτέ.",
      "Split action: δύο παίκτες διασταυρώνονται πάνω από τον ψηλό στο post/elbow.",
      "Handoffs (DHO) & pindown screens για τον σουτέρ off-ball.",
      "Spacing 5-out — κάθε drive έχει τρεις kick-out επιλογές."
    ],
    defense:[
      "Switch-heavy: ευέλικτοι παίκτες αλλάζουν σχεδόν τα πάντα.",
      "Small-ball «Death Lineup» — ένταση, χέρια, κλεψίματα.",
      "Γρήγορη μετάβαση από άμυνα σε επίθεση μετά το stop."
    ],
    transition:[
      "Push μετά από κάθε stop — η άμυνα τροφοδοτεί την επίθεση.",
      "Early motion & drag screens πριν στηθεί ο αντίπαλος.",
      "Ο σουτέρ τρέχει άμεσα σε off-ball screen (transition three)."
    ],
    special:[
      "Elevator doors & stagger screens για καθαρό τρίποντο.",
      "Fake handoffs & back-cuts όταν η άμυνα υπερ-δεσμεύεται.",
      "Read & react — όχι στατικές κλήσεις."
    ]
  },
  movements:[
    {from:[20,54],to:[50,64],type:"run"},
    {from:[80,54],to:[52,64],type:"run"},
    {from:[50,34],to:[20,54],type:"pass"}
  ],
  keyRoles:["Σουτέρ off-ball","Ψηλός με screens & DHO","Ευέλικτοι αμυντικοί (switch)"]
},
{
  id:"spo-heat", name:"Positionless & Zone — «Heat Culture»", coach:"Erik Spoelstra",
  team:"Miami Heat", system:"2-3 Zone (Άμυνα)", emoji:"🔥", intensity:"Πολύ Υψηλή",
  style:["Positionless","Zone defense","Ένταση","Cutting","Προσαρμοστικότητα"],
  summary:"Ευέλικτο, «positionless» μπάσκετ με σκληρή ταυτότητα εργασίας. Εναλλαγή man με 2-3 zone για να σπάσει τον ρυθμό του αντιπάλου, επιθετικά cuts & spacing, και ακαταμάχητη ένταση («Heat Culture»).",
  phases:{
    offense:[
      "Positionless: όλοι χειρίζονται, μπλοκάρουν & σουτάρουν ανάλογα με τη φάση.",
      "Constant cutting: back-cuts & relocations, δεν μένει κανείς στάσιμος.",
      "Pick & roll + spacing, εκμετάλλευση mismatch μετά από switch.",
      "Επιθετικό ριμπάουντ — δεύτερες ευκαιρίες ως ταυτότητα."
    ],
    defense:[
      "Εναλλαγή man ↔ 2-3 zone για να μπερδέψει τον ρυθμό του αντιπάλου.",
      "Στη zone: κλείσιμο high-post & γωνιών, active χέρια, trap στη γωνία.",
      "Aggressive help, κλεψίματα, μετατροπή άμυνας σε γρήγορη επίθεση."
    ],
    transition:[
      "Μετά από stop/κλέψιμο → άμεση αντεπίθεση σε αριθμητικό πλεονέκτημα.",
      "Γεμίζουμε τους διαδρόμους, ο σουτέρ στη γωνία.",
      "Transition D με πρώτο στόχο τη μπάλα & προστασία ρακέτας."
    ],
    special:[
      "Zone traps στις γωνίες για ανατροπή ρυθμού.",
      "Box-and-one / junk σε ειδικές περιπτώσεις (κορυφαίος αντίπαλος).",
      "ATO set plays με έμφαση σε cutters & καθαρά σουτ."
    ]
  },
  movements:[
    {from:[36,52],to:[16,74],type:"run"},
    {from:[64,52],to:[84,74],type:"run"},
    {from:[50,83],to:[50,72],type:"run"}
  ],
  keyRoles:["Ευέλικτοι positionless","Active αμυντικοί zone","Ψυχή & ένταση"]
},
{
  id:"bud-bucks", name:"Drop Coverage & 3&D — «Παίξε τα ποσοστά»", coach:"Mike Budenholzer",
  team:"Milwaukee Bucks", system:"Man-to-Man (Άμυνα)", emoji:"🦌", intensity:"Υψηλή",
  style:["Drop coverage","Προστασία ρακέτας","Τρίποντα","Spacing","Παίξε τα νούμερα"],
  summary:"Αμυντικά: ο ψηλός «κάθεται» κάτω (drop), κλείνει τη ρακέτα και δίνει το μακρινό δίποντο· οι υπόλοιποι στεγνώνουν το τρίποντο. Επιθετικά: μέγιστο spacing γύρω από έναν κυρίαρχο επιθετικό και βροχή τριπόντων.",
  phases:{
    offense:[
      "Spacing 4-out/5-out γύρω από τον κυρίαρχο επιθετικό (drive-heavy).",
      "Drive & kick: η διείσδυση δημιουργεί καθαρά τρίποντα κατάστασης.",
      "Pick & roll με roll man που τελειώνει ή short-roll playmaking.",
      "Ιεράρχηση: καλάθι & τρίποντο — αποφυγή αναποτελεσματικών σουτ."
    ],
    defense:[
      "Drop coverage στο PnR: ο ψηλός προστατεύει τη ρακέτα, δίνει mid-range.",
      "Stunt & recover — «στεγνώνουμε» το τρίποντο, κλείνουμε τον διάδρομο.",
      "Κυριαρχία αμυντικού ριμπάουντ (ο προστάτης ρακέτας τελειώνει τη φάση).",
      "Πειθαρχία: παίζουμε τα ποσοστά, όχι το ρίσκο."
    ],
    transition:[
      "Μετά το ριμπάουντ → γρήγορο outlet & push για early offense.",
      "Transition D: sprint back, matched up, προστασία ρακέτας πρώτα.",
      "Ισορροπία — δεν κυνηγάμε επιθετικό ριμπάουντ σε βάρος της επιστροφής."
    ],
    special:[
      "Sideline/baseline OB για καθαρό τρίποντο ή lob στον ψηλό.",
      "ATO με drive & kick προς τους σουτέρ.",
      "Late-clock: ισο για τον κορυφαίο ή απλό PnR."
    ]
  },
  movements:[
    {from:[50,46],to:[50,60],type:"run"},
    {from:[22,58],to:[22,58],type:"run"},
    {from:[56,82],to:[56,70],type:"run"}
  ],
  keyRoles:["Προστάτης ρακέτας (drop)","Κυρίαρχος slasher","Σουτέρ κατάστασης"]
},
{
  id:"nurse-junk", name:"Junk Defenses — «Box-and-One & Ρυθμός»", coach:"Nick Nurse",
  team:"Toronto Raptors", system:"1-3-1 Zone (Άμυνα)", emoji:"🦖", intensity:"Υψηλή",
  style:["Junk defenses","Box-and-One","Zone","Trapping","Εκπλήξεις"],
  summary:"Ο μάστορας των «junk» αμυνών: box-and-one, triangle-and-two, εναλλαγές zone και επιθετικά traps για να απορυθμίσει τον αντίπαλο. Δίνει στον κορυφαίο αντίπαλο διαφορετική «εικόνα» σε κάθε κατοχή.",
  phases:{
    offense:[
      "Spacing & ball movement, εκμετάλλευση mismatch μετά από switch.",
      "Pick & roll με reads, drive & kick προς τους σουτέρ.",
      "Επιθετική ευελιξία — πολλοί δημιουργοί, ανάγνωση της άμυνας.",
      "Επιθετικό ριμπάουντ για δεύτερες ευκαιρίες."
    ],
    defense:[
      "Junk defenses: box-and-one (4 zone + 1 man στον αστέρα), triangle-and-two.",
      "Εναλλαγή man ↔ 1-3-1 / 2-3 zone για συνεχή αλλαγή εικόνας.",
      "Aggressive traps στο PnR & στις γωνίες, active χέρια, κλεψίματα.",
      "Στόχος: να βγάλει η άμυνα τον αντίπαλο εκτός ρυθμού."
    ],
    transition:[
      "Traps → κλεψίματα → άμεση αντεπίθεση σε αταξία.",
      "Push σε αριθμητικό πλεονέκτημα, σουτέρ στη γωνία.",
      "Transition D με αναγνώριση αστέρα (matchup)."
    ],
    special:[
      "Ειδικές αμύνες για τον κορυφαίο σκόρερ του αντιπάλου.",
      "1-3-1 trap για να αναγκάσει λάθη & 8 δευτ. violations.",
      "ATO με στοιχείο έκπληξης."
    ]
  },
  movements:[
    {from:[50,40],to:[18,62],type:"run"},
    {from:[18,62],to:[50,58],type:"run"},
    {from:[50,84],to:[50,70],type:"run"}
  ],
  keyRoles:["Ευέλικτοι αμυντικοί","Stopper στον αστέρα","Δημιουργοί επίθεσης"]
},
{
  id:"thibs-grind", name:"Αμυντικό Grinding & ICE PnR", coach:"Tom Thibodeau",
  team:"New York Knicks / Chicago", system:"Man-to-Man (Άμυνα)", emoji:"⚙️", intensity:"Ακραία (αμυντική)",
  style:["Σκληρή άμυνα","ICE PnR","Strong-side overload","Ριμπάουντ","Ένταση 48'"],
  summary:"Αμυντικός φανατισμός. Στιβαρό man-to-man με «ICE» (κλείσιμο του πλαγίου pick & roll προς τη γραμμή), strong-side συμπύκνωση και ανελέητο box-out. Επίθεση απλή, βασισμένη στο PnR και στα ριμπάουντ.",
  phases:{
    offense:[
      "Απλή, αποτελεσματική επίθεση — PnR & post-ups, χωρίς περιττά.",
      "Strong-side action, δεύτερη φάση από επιθετικό ριμπάουντ.",
      "Mid-range & ελεύθερες βολές — φυσικό, contact-heavy παιχνίδι.",
      "Ρόλοι ξεκάθαροι: ο σκόρερ σκοράρει, οι υπόλοιποι δουλεύουν."
    ],
    defense:[
      "ICE (down) το πλάγιο PnR — σπρώχνεις τη μπάλα στη γραμμή/baseline.",
      "Strong-side overload: όλες οι βοήθειες μαζεμένες στην πλευρά της μπάλας.",
      "«Blitz» ή hard hedge στους αστέρες, recover στους σουτέρ.",
      "Ριμπάουντ πάνω απ' όλα — box-out των πέντε, καμία δεύτερη ευκαιρία."
    ],
    transition:[
      "Transition D πρώτη προτεραιότητα — sprint back, σταμάτα τη μπάλα.",
      "Μετά από stop → ελεγχόμενο push, όχι ρίσκο.",
      "Match up γρήγορα, βρες τον σουτέρ στη γωνία."
    ],
    special:[
      "Αμυντικά sets για baseline OB (κλείσιμο lob & γωνίας).",
      "Fouls διαχείρισης & πειθαρχία στα κρίσιμα.",
      "Επιθετικό ριμπάουντ ως όπλο (δεύτερες ευκαιρίες)."
    ]
  },
  movements:[
    {from:[50,46],to:[30,58],type:"run"},
    {from:[22,58],to:[38,66],type:"run"},
    {from:[78,58],to:[60,66],type:"run"}
  ],
  keyRoles:["Ακούραστοι αμυντικοί","Ψηλός ριμπάουντερ","Σκόρερ mid-range"]
},
{
  id:"messina-euro", name:"European Pick & Roll — «Read & React»", coach:"Ettore Messina",
  team:"Euroleague (CSKA / Olimpia Milano)", system:"1-4 High", emoji:"🇪🇺", intensity:"Υψηλή",
  style:["Pick & roll","Spacing","Reads","Εκτέλεση","Ομαδικότητα"],
  summary:"Η ευρωπαϊκή σχολή: υπομονετική, εκτελεστική επίθεση με βάση το pick & roll και το διάβασμα της άμυνας. Καθαρά spacing, δεύτερες & τρίτες πάσες, μηδενικός εγωισμός — η ευφυΐα πάνω από την αθλητικότητα.",
  phases:{
    offense:[
      "1-4 high για καθαρό PnR στην κορυφή, ρακέτα ανοιχτή.",
      "Read the coverage: roll, pop, pocket pass, skip στη γωνία.",
      "Second-side action: αν κλείσει η πρώτη επιλογή, γρήγορη αντιστροφή.",
      "Εκτέλεση & υπομονή — 24'' με σκοπό, καλό σουτ στο τέλος."
    ],
    defense:[
      "Πειθαρχημένο man-to-man με σαφές PnR coverage (drop/hedge ανά αντίπαλο).",
      "Team defense — έγκαιρες rotations, no easy baskets.",
      "Contest & ριμπάουντ, έλεγχος τέμπο."
    ],
    transition:[
      "Ελεγχόμενο early offense — μεταφορά & άμεσο PnR αν υπάρχει πλεονέκτημα.",
      "Ισορροπία: η ευρωπαϊκή προσέγγιση προστατεύει την κατοχή.",
      "Transition D οργανωμένη, matched up."
    ],
    special:[
      "Πλούσιο playbook ATO/BLOB/SLOB — καθαρές λύσεις.",
      "Horns sets & flare screens για σουτέρ.",
      "Late-clock PnR για τον κορυφαίο δημιουργό."
    ]
  },
  movements:[
    {from:[50,32],to:[50,48],type:"run"},
    {from:[62,60],to:[52,44],type:"screen"},
    {from:[62,60],to:[56,74],type:"run"}
  ],
  keyRoles:["Ευφυής δημιουργός PnR","Ψηλός roll & pop","Ομαδικοί εκτελεστές"]
},
{
  id:"obradovic-eur", name:"Άμυνα & Εκτέλεση — «Euroleague DNA»", coach:"Željko Obradović",
  team:"Euroleague (θρύλος με 9 τίτλους)", system:"Man-to-Man (Άμυνα)", emoji:"🏆", intensity:"Ακραία",
  style:["Σκληρή άμυνα","Πάθος","Εκτέλεση","Πειθαρχία","Στημένες"],
  summary:"Ο πιο τιτλούχος προπονητής της Euroleague: άμυνα-πρώτα με πάθος και ένταση, τέλεια εκτελεσμένες στημένες φάσεις και απόλυτη πειθαρχία. Κάθε κατοχή έχει σκοπό — η νοοτροπία νικητή ως σύστημα.",
  phases:{
    offense:[
      "Δομημένη επίθεση με καθαρά sets — υψηλή εκτέλεση, μηδέν σπατάλη.",
      "Pick & roll & post-ups με ανάγνωση, εκμετάλλευση mismatch.",
      "Spacing & αντιστροφές — «κουνάμε» την άμυνα μέχρι το καλό σουτ.",
      "Ο κορυφαίος παίρνει την μπάλα στα κρίσιμα (go-to actions)."
    ],
    defense:[
      "Man-to-man με ακραία ένταση & πάθος — «αμύνσου σαν να είναι το τελευταίο».",
      "Έξυπνες βοήθειες, contest κάθε σουτ, no easy baskets.",
      "Ριμπάουντ & έλεγχος — η άμυνα ορίζει την ταυτότητα.",
      "Προσαρμογή coverage στον εκάστοτε αντίπαλο (scouting)."
    ],
    transition:[
      "Θετική: γρήγορη μεταφορά μετά την ανάκτηση, early actions.",
      "Αρνητική: πειθαρχημένη επιστροφή, προστασία ρακέτας.",
      "Ισορροπία & έλεγχος τέμπο."
    ],
    special:[
      "Κορυφαίες στημένες φάσεις (ATO) — η υπογραφή του.",
      "Timeout adjustments που αλλάζουν τον αγώνα.",
      "Clutch execution — πλάνο για τα τελευταία λεπτά."
    ]
  },
  movements:[
    {from:[50,46],to:[38,60],type:"run"},
    {from:[56,82],to:[46,68],type:"screen"},
    {from:[50,46],to:[78,58],type:"pass"}
  ],
  keyRoles:["Ηγέτης-αμυντικός","Εκτελεστής clutch","Ευφυής ψηλός"]
},
{
  id:"press-1211", name:"Full-Court Press 1-2-1-1 — «Πίεση & Χάος»", coach:"Πίεση ολόκληρου γηπέδου",
  team:"Full-court press", system:"1-2-1-1 Press (Full)", emoji:"🕸️", intensity:"Ακραία",
  style:["Full-court press","Traps","Κλεψίματα","Ρυθμός","Ένταση"],
  summary:"Ασφυκτική πίεση σε όλο το μήκος. Ένας πιέζει τον inbounder, δύο «wings» παγιδεύουν την πρώτη πάσα στη γωνία, ένας καλύπτει το κέντρο και ένας μένει safety πίσω. Στόχος: κλεψίματα, 8'' violations και εύκολοι πόντοι μετάβασης — απορρύθμιση του ρυθμού του αντιπάλου.",
  phases:{
    offense:[
      "Μετά το κλέψιμο → άμεση αντεπίθεση σε αριθμητικό πλεονέκτημα.",
      "Γέμισε τους διαδρόμους, ο σουτέρ τρέχει στη γωνία.",
      "Εύκολοι πόντοι πριν στηθεί η άμυνα του αντιπάλου.",
      "Αν δεν υπάρχει break → ομαλή μετάβαση στη στημένη επίθεση."
    ],
    defense:[
      "Ο μπροστινός πιέζει τον inbounder & υπαγορεύει την πάσα στη γωνία.",
      "Οι δύο wings παγιδεύουν (trap) τον παραλήπτη στη γωνία/πλάγια γραμμή.",
      "Ο μεσαίος «διαβάζει» & κόβει την επόμενη πάσα (interceptor).",
      "Ο safety προστατεύει το καλάθι — ποτέ layup πίσω από την πίεση."
    ],
    transition:[
      "Θετική: αστραπιαία επίθεση μόλις κερδηθεί η μπάλα.",
      "Αρνητική: αν σπάσει η πίεση → sprint back, matched up, no easy basket.",
      "Ισορροπία ρίσκου: η πίεση κοστίζει — διάλεξε τις στιγμές (σκορ/χρόνος)."
    ],
    special:[
      "Trigger: μετά από καλάθι/ελεύθερη βολή (made-basket press).",
      "Εναλλαγή με half-court άμυνα για να μη «διαβαστεί».",
      "Rotations στην πλάτη — ο safety & ο κοντινός καλύπτουν εναλλάξ."
    ]
  },
  movements:[
    {from:[50,92],to:[28,82],type:"pass"},
    {from:[26,78],to:[34,82],type:"run"},
    {from:[50,64],to:[36,78],type:"run"}
  ],
  keyRoles:["Πιεστής inbounder","Δύο wings παγίδας","Interceptor & safety"]
},
{
  id:"press-221", name:"2-2-1 Press — «Ελεγχόμενη Πίεση»", coach:"Πίεση ολόκληρου γηπέδου",
  team:"Full-court / 3-4 press", system:"2-2-1 Press (Full)", emoji:"⛓️", intensity:"Υψηλή",
  style:["3/4 & full press","Καθυστέρηση","Traps πλάγιας","Ενέργεια","Ρυθμός"],
  summary:"Πιο ελεγχόμενη πίεση: δύο μπροστά «οδηγούν» τη μπάλα στη μία πλευρά, δύο στη μέση παγιδεύουν στη γραμμή της μεσαίας, ένας safety πίσω. Λιγότερο ρίσκο από το 1-2-1-1 — κερδίζει χρόνο, κουράζει τον αντίπαλο και προκαλεί λάθη χωρίς να εκτίθεται.",
  phases:{
    offense:[
      "Μετά την ανάκτηση → γρήγορη μεταφορά & early offense.",
      "Επίθεση σε αταξία, σουτέρ στη γωνία.",
      "Αν δεν υπάρχει πλεονέκτημα → οργανωμένη στημένη."
    ],
    defense:[
      "Οι δύο μπροστινοί «σπρώχνουν» τη μπάλα στη μία πλάγια (force sideline).",
      "Οι δύο μεσαίοι παγιδεύουν κοντά στη μεσαία γραμμή (trap στη γωνία).",
      "Ο safety διαβάζει τη μεγάλη πάσα & προστατεύει το καλάθι.",
      "Πλάγια & μεσαία γραμμή = «τοίχοι» της παγίδας."
    ],
    transition:[
      "Θετική: γρήγορη επίθεση από το κλέψιμο.",
      "Αρνητική: πειθαρχημένη επιστροφή, σταμάτα τη μπάλα.",
      "Contain αν σπάσει το πρώτο επίπεδο — δεύτερη γραμμή έτοιμη."
    ],
    special:[
      "Ιδανικό για διατήρηση προβαδίσματος & διαχείριση ρυθμού.",
      "Made-basket trigger· εναλλαγή full ↔ 3/4 court.",
      "Χαμηλότερο ρίσκο — καλό για νεαρές/λιγότερο αθλητικές ομάδες."
    ]
  },
  movements:[
    {from:[30,84],to:[40,80],type:"run"},
    {from:[70,84],to:[60,80],type:"run"},
    {from:[24,62],to:[40,66],type:"run"}
  ],
  keyRoles:["Δύο μπροστινοί «οδηγοί»","Δύο παγιδευτές μεσαίας","Safety ριμπάουντερ"]
},
{
  id:"play-blob-box", name:"📋 BLOB: Box — Lob & Layup", coach:"Στημένη Φάση (BLOB)",
  team:"Baseline Out of Bounds", system:"Box BLOB (Στημένη)", emoji:"📋", intensity:"—", kind:"play", cat:"setplay",
  style:["BLOB","Στημένη","Lob","Back-screen"],
  summary:"Επαναφορά από τη γραμμή του τέρματος (BLOB) σε σχηματισμό «box». Ο ψηλός βάζει back-screen στον κόφτη για κάρφωμα/lob, με δεύτερη επιλογή το τρίποντο γωνίας αν βοηθήσει η άμυνα. Καθαρή, εκτελέσιμη λύση για εύκολο καλάθι κάτω από την εστία.",
  phases:{
    offense:[
      "1) Ο inbounder (PG) βγαίνει εκτός γραμμής με τη μπάλα, μετρά «5».",
      "2) Ο C βάζει back-screen στον PF που κόβει στο καλάθι (lob/layup).",
      "3) Πρώτη επιλογή: ψηλή πάσα (lob) στον κόφτη PF.",
      "4) Δεύτερη επιλογή: SG/SF ανοίγει στη γωνία για τρίποντο αν βοηθήσει η άμυνα."
    ],
    defense:[
      "Αν κλείσει: ο inbounder καλεί timeout ή δίνει ασφαλή έξω.",
      "Rest-defense: 1-2 παίκτες έτοιμοι για transition D.",
      "Αντι-BLOB: switch τα screens, «top-lock» τον κύριο σουτέρ."
    ],
    transition:[
      "Αν χαθεί η μπάλα στην επαναφορά → άμεση επιστροφή, σταμάτα τη μπάλα.",
      "Μετά το καλάθι → οργανωμένη υποχώρηση."
    ],
    special:[
      "Timing: ο κόφτης περιμένει το screen — όχι νωρίς.",
      "Counter: αν switch-άρουν → ο screener «κυλάει» (slip) στο καλάθι.",
      "Χρησιμοποίησέ το σε κρίσιμη κατοχή (last-second BLOB)."
    ]
  },
  movements:[
    {from:[60,92],to:[46,94],type:"screen"},
    {from:[40,92],to:[52,97],type:"run"},
    {from:[50,99],to:[52,96],type:"pass"},
    {from:[38,80],to:[16,86],type:"run"}
  ],
  keyRoles:["Screener ψηλός (C)","Κόφτης στο καλάθι (PF)","Σουτέρ γωνίας"]
},
{
  id:"play-ato-horns", name:"📋 ATO: Horns Flare — Τρίποντο", coach:"Στημένη Φάση (ATO)",
  team:"After Timeout", system:"Horns ATO (Στημένη)", emoji:"📋", intensity:"—", kind:"play", cat:"setplay",
  style:["ATO","Horns","Flare screen","Τρίποντο","PnR"],
  summary:"Στημένη μετά από timeout (ATO) από σχηματισμό Horns. Ballscreen στην κορυφή τραβά την άμυνα, ενώ στην αδύναμη πλευρά στήνεται flare screen για καθαρό τρίποντο του σουτέρ. Διπλή απειλή: pick & roll ή τρίποντο γωνίας/πτέρυγας.",
  phases:{
    offense:[
      "1) PF βάζει ballscreen στον PG στην κορυφή (Horns PnR).",
      "2) Ταυτόχρονα ο C βάζει flare screen για τον SF στην αδύναμη πλευρά.",
      "3) Πρώτη επιλογή: skip πάσα στον SF για καθαρό τρίποντο.",
      "4) Δεύτερη επιλογή: PnR — roll του PF ή pop, ανάλογα με το coverage."
    ],
    defense:[
      "Αν κλείσουν και τα δύο: επανάληψη PnR ή ισο για τον κορυφαίο.",
      "Rest-defense: ισορροπία μετάβασης πάντα.",
      "Αντι-ATO: switch τα screens, ξεχώρισε τον σουτέρ (deny)."
    ],
    transition:[
      "Αν χαθεί → άμεσο transition D, matched up.",
      "Μετά το σουτ → οργανωμένη επιστροφή."
    ],
    special:[
      "Χρονισμός: το flare πρέπει να «χτυπήσει» ταυτόχρονα με το PnR.",
      "Counter: αν βοηθήσει ο αμυντικός του σουτέρ → roll στο καλάθι.",
      "Ιδανικό για καθαρό σουτ από συγκεκριμένο εκτελεστή."
    ]
  },
  movements:[
    {from:[38,60],to:[48,44],type:"screen"},
    {from:[62,60],to:[80,64],type:"screen"},
    {from:[88,62],to:[84,52],type:"run"},
    {from:[50,30],to:[84,54],type:"pass"}
  ],
  keyRoles:["Χειριστής PnR (PG)","Screener PF (roll/pop)","Σουτέρ flare (SF)"]
},
{
  id:"play-slob-zipper", name:"📋 SLOB: Zipper — Πλάγια Επαναφορά", coach:"Στημένη Φάση (SLOB)",
  team:"Sideline Out of Bounds", system:"Zipper SLOB (Στημένη)", emoji:"📋", intensity:"—", kind:"play", cat:"setplay",
  style:["SLOB","Zipper cut","Στημένη","Καθαρή επαναφορά"],
  summary:"Επαναφορά από την πλάγια γραμμή (SLOB). Ο σουτέρ κάνει «zipper» cut από το low block στην κορυφή πάνω από screen του ψηλού, δεχόμενος καθαρά τη μπάλα για σουτ, PnR ή οργάνωση. Ασφαλής, γρήγορη λύση για να «μπει» η μπάλα στο παιχνίδι.",
  phases:{
    offense:[
      "1) Ο PG (inbounder) στην πλάγια γραμμή, μετρά «5».",
      "2) Ο C βάζει screen· ο SG κάνει zipper cut από το block στην κορυφή.",
      "3) Πρώτη επιλογή: πάσα στον SG στην κορυφή για σουτ/επόμενη ενέργεια.",
      "4) Συνέχεια: άμεσο PnR κορυφής με τον C αν δεν υπάρχει σουτ."
    ],
    defense:[
      "Αν deny-άρουν το zipper → back-cut στο καλάθι.",
      "Δεύτερη επαναφορά: ο PF ανοίγει ως ασφαλής λύση.",
      "Rest-defense: ισορροπία για transition."
    ],
    transition:[
      "Αν χαθεί η επαναφορά → sprint back, σταμάτα τη μπάλα.",
      "Μετά την ενέργεια → οργανωμένη υποχώρηση."
    ],
    special:[
      "Χρησιμοποίησέ το για να «μπει» η μπάλα υπό πίεση με ασφάλεια.",
      "Counter: αν top-lock → back-door στο καλάθι.",
      "Ρέει φυσικά σε PnR ή motion μετά την επαναφορά."
    ]
  },
  movements:[
    {from:[64,84],to:[52,70],type:"screen"},
    {from:[50,88],to:[50,66],type:"run"},
    {from:[96,58],to:[50,64],type:"pass"}
  ],
  keyRoles:["Inbounder (PG)","Zipper σουτέρ (SG)","Screener ψηλός (C)"]
},
{
  id:"my-hybrid", name:"⭐ ΔΙΚΗ ΜΟΥ: Motion + Drop D", coach:"Ο Προπονητής μου", team:"Η Ομάδα μου",
  system:"5-Out (Motion)", emoji:"⭐", intensity:"Υψηλή",
  style:["Motion με spacing","Drop coverage","Ρυθμός","Ριμπάουντ"],
  summary:"Πρότυπη «δική μου» φιλοσοφία: επιθετικά motion 5-out με drive & kick και τρίποντο γωνίας· αμυντικά drop coverage που προστατεύει τη ρακέτα και στεγνώνει το τρίποντο. Προσάρμοσέ την στους δικούς σου παίκτες.",
  phases:{
    offense:[
      "5-out motion: pass & cut, drive & kick, extra pass για καθαρό σουτ.",
      "Κανόνας «0.5»: γρήγορη απόφαση, καμία στάσιμη μπάλα.",
      "Pick & roll ως δεύτερη επιλογή όταν κλείσει το motion.",
      "Στόχοι σουτ: καλάθι & τρίποντο γωνίας."
    ],
    defense:[
      "Drop coverage στο PnR — προστασία ρακέτας, δίνουμε mid-range.",
      "Help & recover, στεγνώνουμε το τρίποντο, contain την μπάλα.",
      "Κυριαρχία αμυντικού ριμπάουντ — box-out των πέντε."
    ],
    transition:[
      "Θετική: push μετά από κάθε stop για early offense.",
      "Αρνητική: sprint back, ο πρώτος σταματά τη μπάλα.",
      "Ισορροπία — 1-2 παίκτες πάντα έτοιμοι για επιστροφή."
    ],
    special:[
      "2-3 quick-hitters (ATO) για καθαρό σουτ σε συγκεκριμένους παίκτες.",
      "SLOB/BLOB με πρώτη & δεύτερη επιλογή.",
      "Επιθετικό ριμπάουντ επιλεκτικά (χωρίς να χαθεί το transition balance)."
    ]
  },
  movements:[
    {from:[50,34],to:[35,55],type:"run"},
    {from:[35,55],to:[8,80],type:"pass"},
    {from:[80,54],to:[92,80],type:"run"},
    {from:[50,34],to:[62,48],type:"run"}
  ],
  keyRoles:["Ανιδιοτελής πλέι","Ψηλός drop & roll","Σουτέρ γωνίας"]
},

/* ================= ΒΙΒΛΙΟΘΗΚΗ ΣΥΝΕΡΓΑΣΙΩΝ (PLAYBOOK) ================= */

/* ---- Στημένες φάσεις (επιπλέον) ---- */
{ id:"play-ato-stagger", cat:"setplay", name:"📋 ATO: Stagger — Σουτέρ off double", coach:"Στημένη Φάση (ATO)",
  team:"After Timeout", system:"Stagger", emoji:"📋", intensity:"—", kind:"play",
  summary:"Διπλό μπλόκο (stagger) για να ελευθερωθεί ο σουτέρ. Ο σουτέρ ξεκινά χαμηλά και ανεβαίνει πάνω από δύο διαδοχικά μπλόκα για καθαρό catch & shoot στην κορυφή/πτέρυγα.",
  customPositions:[{r:"PG",x:50,y:34},{r:"SG",x:40,y:86},{r:"PF",x:42,y:66},{r:"C",x:50,y:60},{r:"SF",x:84,y:54}],
  phases:{
    offense:["Ο σουτέρ (SG) ξεκινά από το low block.","PF & C στήνουν διαδοχικό stagger μπλόκο.","Ο SG ανεβαίνει, τρίβεται και στα δύο, δέχεται πάνω για σουτ.","Πάσα του PG στον SG για catch & shoot."],
    defense:["Αν top-lock → ο SG κάνει back-cut στο καλάθι.","Αν switch → ο δεύτερος screener (C) κυλάει (slip)."],
    transition:["Ισορροπία: PG & ένας ψηλός έτοιμοι για επιστροφή."],
    special:["Ο σουτέρ περιμένει τα μπλόκα — σωστό timing.","Πόδια έτοιμα πριν την πάσα (hop).","Οι screeners «κρατούν» τον αμυντικό (solid screens)."]
  },
  movements:[{from:[42,66],to:[46,58],type:"screen"},{from:[50,60],to:[52,50],type:"screen"},{from:[40,86],to:[52,48],type:"run"},{from:[50,34],to:[52,48],type:"pass"}]
},
{ id:"play-blob-stack", cat:"setplay", name:"📋 BLOB: Stack — Γρήγορο Καλάθι", coach:"Στημένη Φάση (BLOB)",
  team:"Baseline Out of Bounds", system:"Stack BLOB", emoji:"📋", intensity:"—", kind:"play",
  summary:"Επαναφορά από τη γραμμή τέρματος σε στοίβα (stack). Οι παίκτες ξεκινούν μαζεμένοι και «σκορπίζουν» με μπλόκα — πρώτη λύση το κάρφωμα/layup, δεύτερη το τρίποντο γωνίας.",
  customPositions:[{r:"PG",x:50,y:99},{r:"C",x:50,y:88},{r:"PF",x:50,y:84},{r:"SG",x:50,y:80},{r:"SF",x:50,y:76}],
  phases:{
    offense:["Οι 4 στοιβάζονται μπροστά από τον inbounder (PG).","Στο σύνθημα «σκορπίζουν»: ο C βάζει μπλόκο, ο PF κόβει στο καλάθι.","Πρώτη επιλογή: πάσα στον PF για layup.","Δεύτερη: SG/SF ανοίγουν στις γωνίες για τρίποντο."],
    defense:["Αν κλείσει το καλάθι → ασφαλής έξω & επανοργάνωση.","Αντι-BLOB: switch τα screens → slip του screener."],
    transition:["1-2 παίκτες έτοιμοι για transition D."],
    special:["Timing στα μπλόκα — όχι νωρίς.","Καθαρές γραμμές πάσας — ο inbounder διαβάζει.","Χρήσιμο σε γρήγορη κατοχή / after made basket."]
  },
  movements:[{from:[50,88],to:[46,90],type:"screen"},{from:[50,84],to:[54,95],type:"run"},{from:[50,80],to:[12,82],type:"run"},{from:[50,76],to:[88,82],type:"run"},{from:[50,99],to:[54,93],type:"pass"}]
},

/* ---- Επιθετικές συνεργασίες 2 παικτών ---- */
{ id:"play-pnr", cat:"off2", name:"🤝 Pick & Roll (πλάγιο)", coach:"Συνεργασία 2 παικτών",
  team:"2-man game", system:"Side PnR", emoji:"🤝", intensity:"—", kind:"play", ball:{x:50,y:36},
  summary:"Το θεμέλιο του μοντέρνου μπάσκετ. Ο ψηλός βάζει μπλόκο στον χειριστή· ανάλογα με το coverage, ο χειριστής επιτίθεται και ο ψηλός κόβει (roll) στο καλάθι. Απειλή για σουτ, διείσδυση ή τρίποντο γωνίας.",
  customPositions:[{r:"PG",x:50,y:36},{r:"C",x:58,y:50},{r:"PF",x:14,y:54},{r:"SG",x:8,y:82},{r:"SF",x:92,y:82}],
  phases:{
    offense:["Ο PG καλεί το ballscreen· ο C έρχεται ψηλά.","Ο PG «τρίβεται» στο μπλόκο & επιτίθεται στο κέντρο.","Ο C κάνει roll στο καλάθι (απειλή lob/layup).","Reads: kick στη γωνία αν βοηθήσουν, pull-up αν drop."],
    defense:["Vs drop → σταμάτα για σουτ ή floater.","Vs switch → επίθεση στο mismatch· vs blitz → πάσα στον roller (4v3)."],
    transition:["Rest-defense: ο weak-side μένει έτοιμος."],
    special:["Κολλητά στο μπλόκο (shoulder-to-shoulder).","Άλλαξε ταχύτητα μετά το μπλόκο.","Μάτια πάνω — διάβασε τον χαμηλό βοηθό (low man)."]
  },
  movements:[{from:[58,50],to:[48,40],type:"screen"},{from:[50,36],to:[40,58],type:"run"},{from:[58,50],to:[52,80],type:"run"}]
},
{ id:"play-pnpop", cat:"off2", name:"🤝 Pick & Pop", coach:"Συνεργασία 2 παικτών",
  team:"2-man game", system:"PnR Pop", emoji:"🤝", intensity:"—", kind:"play", ball:{x:50,y:36},
  summary:"Παραλλαγή του PnR με ψηλό-σουτέρ (stretch 4/5). Αντί για roll, ο screener «ανοίγει» (pop) πίσω από τη γραμμή για καθαρό τρίποντο — τιμωρεί το drop coverage.",
  customPositions:[{r:"PG",x:50,y:36},{r:"PF",x:56,y:50},{r:"SG",x:8,y:82},{r:"SF",x:92,y:82},{r:"C",x:30,y:88}],
  phases:{
    offense:["Ο PF βάζει ballscreen στον PG.","Αντί για roll, ο PF «ανοίγει» (pop) στην κορυφή/πτέρυγα.","Πάσα στον PF για καθαρό τρίποντο.","Αν closeout-άρει → drive & kick."],
    defense:["Vs drop → ο pop είναι κενός (πάσα & σουτ).","Vs switch → ο PG επιτίθεται στο mismatch."],
    transition:["Ο C στο dunker κρατά επιθετικό ριμπάουντ/ισορροπία."],
    special:["Ο PF «σέβεται» το μπλόκο πριν ανοίξει.","Γρήγορη πάσα pocket/kick.","Ιδανικό για stretch ψηλό."]
  },
  movements:[{from:[56,50],to:[48,40],type:"screen"},{from:[50,36],to:[42,54],type:"run"},{from:[56,50],to:[68,42],type:"run"},{from:[50,36],to:[68,42],type:"pass"}]
},
{ id:"play-dho", cat:"off2", name:"🤝 Dribble Hand-Off (DHO)", coach:"Συνεργασία 2 παικτών",
  team:"2-man game", system:"DHO", emoji:"🤝", intensity:"—", kind:"play",
  summary:"Ο ψηλός με τη μπάλα δίνει «hand-off» στον γκαρντ που έρχεται τρέχοντας, μετατρέποντάς το αμέσως σε pick & roll. Δημιουργεί κίνηση, ρυθμό και δύσκολες αποφάσεις για την άμυνα.",
  customPositions:[{r:"C",x:50,y:54},{r:"SG",x:34,y:58},{r:"PG",x:70,y:44},{r:"SF",x:8,y:80},{r:"PF",x:92,y:80}],
  phases:{
    offense:["Ο C κρατά τη μπάλα ψηλά (elbow/top).","Ο SG έρχεται τρέχοντας & δέχεται hand-off.","Ο C γυρνά αμέσως σε ballscreen (DHO → PnR).","Ο SG επιτίθεται· ο C roll ή pop."],
    defense:["Vs switch → ο SG επιτίθεται στο mismatch.","Vs «ice/blue» → back-cut ή re-screen."],
    transition:["Ο PG στην κορυφή = safety ισορροπίας."],
    special:["Ο SG «σετάρει» τον αμυντικό πριν το handoff.","Χαμηλό κέντρο βάρους στην παραλαβή.","Ρυθμός & αιφνιδιασμός — γρήγορη εκτέλεση."]
  },
  movements:[{from:[34,58],to:[46,52],type:"run"},{from:[50,54],to:[46,52],type:"pass"},{from:[50,54],to:[50,70],type:"screen"}]
},
{ id:"play-giveandgo", cat:"off2", name:"🤝 Πάσα & Κοπή / Back-cut", coach:"Συνεργασία 2 παικτών",
  team:"2-man game", system:"Give & Go", emoji:"🤝", intensity:"—", kind:"play",
  summary:"Η πιο βασική & διαχρονική συνεργασία: πάσα και άμεση κοπή στο καλάθι (give & go). Αν η άμυνα υπερ-μαρκάρει (overplay) την πάσα, ο παίκτης κόβει από πίσω (back-cut) για εύκολο καλάθι.",
  customPositions:[{r:"PG",x:50,y:34},{r:"SG",x:78,y:52},{r:"SF",x:22,y:52},{r:"PF",x:40,y:60},{r:"C",x:60,y:86}],
  phases:{
    offense:["Ο PG πασάρει στον SG στην πτέρυγα.","Ο PG κόβει άμεσα στο καλάθι (basket cut).","Return πάσα για layup αν είναι ελεύθερος.","Αν όχι → γεμίζει χώρο & συνεχίζει το motion."],
    defense:["Αν overplay την πρώτη πάσα → back-cut στο καλάθι.","Αν βοηθήσουν στο cut → kick στον ελεύθερο."],
    transition:["Πάντα ένας ψηλός στην ισορροπία."],
    special:["Κόψε δυνατά (σπριντ), όχι χαλαρά.","Δες τα χέρια του αμυντικού (overplay = back-cut).","Χρόνισε την κοπή με το βλέμμα του πασέρ."]
  },
  movements:[{from:[50,34],to:[76,50],type:"pass"},{from:[50,34],to:[56,80],type:"run"},{from:[78,52],to:[58,78],type:"pass"}]
},
{ id:"play-backscreen", cat:"off2", name:"🤝 Back-screen — Lob", coach:"Συνεργασία 2 παικτών",
  team:"2-man game", system:"Back-screen", emoji:"🤝", intensity:"—", kind:"play",
  summary:"Ο ψηλός βάζει «τυφλό» μπλόκο (back-screen) στην πλάτη του αμυντικού ενός κόφτη, που τρέχει στο καλάθι για alley-oop/lob. Τιμωρεί την υπερβοήθεια της άμυνας στην μπάλα.",
  customPositions:[{r:"SG",x:80,y:52},{r:"PG",x:50,y:36},{r:"PF",x:62,y:60},{r:"SF",x:40,y:58},{r:"C",x:14,y:82}],
  phases:{
    offense:["Ο SG έχει τη μπάλα στην πτέρυγα.","Ο PF βάζει back-screen στον αμυντικό του PG.","Ο PG κόβει στο καλάθι — lob/layup.","Ο PF μετά «ανοίγει» (screen the screener) για σουτ."],
    defense:["Αν switch → ο PF κυλάει στο καλάθι (mismatch ψηλού).","Αν βοηθήσουν στο lob → kick στη γωνία."],
    transition:["Ο C weak-side κρατά ισορροπία."],
    special:["Τυφλό μπλόκο — σταθερός ο screener.","Ο κόφτης «σετάρει» τον αμυντικό πριν κόψει.","Ψηλή, έγκαιρη πάσα (lob) στο σωστό σημείο."]
  },
  movements:[{from:[62,60],to:[54,44],type:"screen"},{from:[50,36],to:[58,82],type:"run"},{from:[80,52],to:[58,80],type:"pass"}]
},

/* ---- Επιθετικές συνεργασίες 3 παικτών ---- */
{ id:"play-split", cat:"off3", name:"👥 Post Split", coach:"Συνεργασία 3 παικτών",
  team:"3-man game", system:"Split action", emoji:"👥", intensity:"—", kind:"play",
  summary:"Μετά από πάσα στον ψηλό στο post, οι δύο περιμετρικοί «διασταυρώνονται» (split) πάνω του με μπλόκο. Δημιουργεί σουτ, backdoor ή hand-off — κλασική συνεργασία του Triangle & των Warriors.",
  customPositions:[{r:"C",x:40,y:84},{r:"PG",x:30,y:56},{r:"SG",x:14,y:80},{r:"SF",x:82,y:54},{r:"PF",x:66,y:60}],
  phases:{
    offense:["Πάσα στον C στο post.","Ο SG (γωνία) βάζει μπλόκο στον PG (split).","Ο PG «τρίβεται» & ανεβαίνει για σουτ/hand-off.","Ο C διαβάζει: πάσα στον σουτέρ ή δικό του post-up."],
    defense:["Αν switch το split → ο screener slip στο καλάθι.","Αν βοηθήσουν στο post → kick out."],
    transition:["Ο PF weak-side = ισορροπία & offensive board."],
    special:["Σκληρά μπλόκα στο split.","Ο C με ψηλό κράτημα & καθαρές πάσες.","Timing μεταξύ πάσας & split."]
  },
  movements:[{from:[14,80],to:[30,66],type:"screen"},{from:[30,56],to:[46,62],type:"run"},{from:[40,84],to:[46,62],type:"pass"}]
},
{ id:"play-hammer", cat:"off3", name:"👥 Hammer — Skip στη γωνία", coach:"Συνεργασία 3 παικτών",
  team:"3-man game", system:"Hammer", emoji:"👥", intensity:"—", kind:"play",
  summary:"Ενώ ο χειριστής επιτίθεται baseline, στην αδύναμη πλευρά στήνεται back-screen («hammer») για να ελευθερωθεί σουτέρ στη γωνία. Ακολουθεί cross-court skip πάσα για ανοιχτό τρίποντο γωνίας.",
  customPositions:[{r:"PG",x:74,y:50},{r:"SG",x:88,y:82},{r:"PF",x:30,y:60},{r:"SF",x:16,y:58},{r:"C",x:55,y:86}],
  phases:{
    offense:["Ο PG επιτίθεται baseline (drive) από δεξιά.","Στην αδύναμη πλευρά ο PF βάζει hammer back-screen.","Ο SF «γλιστρά» στη γωνία χρησιμοποιώντας το μπλόκο.","Cross-court «hammer» πάσα → τρίποντο γωνίας."],
    defense:["Αν ο low man βοηθήσει → η γωνία μένει ελεύθερη.","Αν switch το hammer → ο PF κυλάει στο καλάθι."],
    transition:["Ο C dunker για offensive board/ισορροπία."],
    special:["Ο driver «τραβά» δύο αμυντικούς.","Το hammer screen ακριβώς τη στιγμή του drive.","Καθαρή, δυνατή skip πάσα (χωρίς κρέμασμα)."]
  },
  movements:[{from:[74,50],to:[70,84],type:"run"},{from:[30,60],to:[16,72],type:"screen"},{from:[16,58],to:[10,82],type:"run"},{from:[70,84],to:[10,82],type:"pass"}]
},
{ id:"play-pistol", cat:"off3", name:"👥 Pistol (21) — Early action", coach:"Συνεργασία 3 παικτών",
  team:"3-man game", system:"Pistol", emoji:"👥", intensity:"—", kind:"play",
  summary:"Δημοφιλής «early» συνεργασία γκαρντ-γκαρντ-ψηλού σε μετάβαση/αρχή επίθεσης. Πάσα «21» ανάμεσα στους γκαρντ, hand-off από τον ψηλό και άμεσο PnR πριν στηθεί η άμυνα.",
  customPositions:[{r:"PG",x:80,y:44},{r:"SG",x:60,y:40},{r:"C",x:66,y:54},{r:"SF",x:8,y:80},{r:"PF",x:92,y:80}],
  phases:{
    offense:["Ο PG πασάρει στον SG (pistol «21»).","Ο SG δέχεται DHO/μπλόκο από τον C.","Άμεσο PnR — ο SG επιτίθεται.","Ο C roll ή pop· ο PG relocate για σουτ."],
    defense:["Vs switch → mismatch attack.","Vs drop → pull-up ή pocket στον C."],
    transition:["Παίζεται στα πρώτα δευτ. — αιφνιδιασμός."],
    special:["Ρυθμός & ταχύτητα — early PnR.","Ο PG «σετάρει» πριν την πάσα.","Spacing από τους δύο σουτέρ στις γωνίες."]
  },
  movements:[{from:[80,44],to:[62,42],type:"pass"},{from:[66,54],to:[60,46],type:"screen"},{from:[60,40],to:[50,58],type:"run"},{from:[66,54],to:[58,76],type:"run"}]
},
{ id:"play-flex", cat:"off3", name:"👥 Flex Cut", coach:"Συνεργασία 3 παικτών",
  team:"3-man game", system:"Flex", emoji:"👥", intensity:"—", kind:"play",
  summary:"Κλασική συνεργασία με μπλόκο στη γραμμή τέρματος (flex screen) + down screen. Ο κόφτης περνά «flex» στο καλάθι, ενώ ακολουθεί μπλόκο για τον screener — συνεχής, δύσκολη στο μαρκάρισμα δράση.",
  customPositions:[{r:"PG",x:50,y:36},{r:"SG",x:88,y:52},{r:"SF",x:10,y:84},{r:"PF",x:40,y:86},{r:"C",x:62,y:60}],
  phases:{
    offense:["Πάσα στον SG στην πτέρυγα.","Ο PF βάζει flex screen στη γραμμή τέρματος.","Ο SF περνά «flex» στο καλάθι για layup.","Ο C βάζει down screen στον PF για σουτ (screen the screener)."],
    defense:["Αν κόψουν το flex → ο screener ανοίγει για σουτ.","Vs switch → mismatch στη ρακέτα."],
    transition:["Ισορροπία από PG & weak side."],
    special:["Σκληρά, σταθερά μπλόκα.","Ο κόφτης «διαβάζει» πάνω ή κάτω από το μπλόκο.","Συνέχεια (continuity): επαναλαμβάνεται στην άλλη πλευρά."]
  },
  movements:[{from:[50,36],to:[86,50],type:"pass"},{from:[40,86],to:[54,86],type:"screen"},{from:[10,84],to:[64,86],type:"run"},{from:[62,60],to:[46,72],type:"screen"}]
},

/* ---- Ομαδική επίθεση (5) ---- */
{ id:"play-5out", cat:"team", name:"🏀 5-Out Motion (Continuity)", coach:"Ομαδική επίθεση",
  team:"5-man motion", system:"5-Out (Motion)", emoji:"🏀", intensity:"—", kind:"play",
  summary:"Ομαδική επίθεση χωρίς σταθερές θέσεις: και οι 5 στην περιφέρεια, με κανόνες pass & cut, drive & kick και fill. Μέγιστο spacing, συνεχής κίνηση, positionless — η μπάλα & οι παίκτες δεν σταματούν.",
  customPositions:[{r:"PG",x:50,y:32},{r:"SG",x:20,y:54},{r:"SF",x:80,y:54},{r:"PF",x:8,y:80},{r:"C",x:92,y:80}],
  phases:{
    offense:["Πάσα & κόψε (basket cut) — ο επόμενος γεμίζει (fill).","Drive & kick όταν κλείνει η άμυνα.","Back-cut στο overplay· spacing 4.5μ πάντα.","Κανόνας 0.5: πάσα/σουτ/ντρίμπλα — καμία στάση."],
    defense:["Αν deny → back-cut· αν help → extra pass.","Διάβασε: κλειστή άμυνα → drive, ανοιχτή → σουτ."],
    transition:["Συνεχής ισορροπία — ο πίσω γεμίζει την κορυφή."],
    special:["Κράτα το spacing.","Κόψε δυνατά μετά την πάσα.","Ανιδιοτέλεια — η μπάλα βρίσκει τον ελεύθερο."]
  },
  movements:[{from:[50,32],to:[20,54],type:"pass"},{from:[50,32],to:[54,82],type:"run"},{from:[80,54],to:[60,40],type:"run"}]
},
{ id:"play-chin", cat:"team", name:"🏀 Chin (Princeton)", coach:"Ομαδική επίθεση",
  team:"5-man continuity", system:"Chin", emoji:"🏀", intensity:"—", kind:"play",
  summary:"Συνεργασία «Chin» τύπου Princeton: UCLA back-screen + dribble hand-off σε συνεχή ροή. Έξυπνη, ανιδιοτελής επίθεση με back-cuts & spacing που ανταμείβει το basketball IQ.",
  customPositions:[{r:"PG",x:50,y:34},{r:"SG",x:20,y:52},{r:"SF",x:80,y:52},{r:"C",x:50,y:62},{r:"PF",x:40,y:86}],
  phases:{
    offense:["Πάσα στην πτέρυγα (SG) & UCLA back-screen από τον C στον PG.","Ο PG κόβει στο καλάθι (πρώτη επιλογή layup).","Η μπάλα πάει στον C ψηλά → DHO/PnR (chin action).","Συνέχεια στην άλλη πλευρά αν δεν υπάρχει λύση."],
    defense:["Αν deny το back-screen → back-cut.","Vs switch → mismatch/slip."],
    transition:["Ελεγχόμενη — προστασία κατοχής."],
    special:["Reads, όχι απομνημόνευση.","Σκληρά μπλόκα & δυνατά cuts.","Υπομονή για το καλό σουτ."]
  },
  movements:[{from:[50,34],to:[22,52],type:"pass"},{from:[50,62],to:[52,46],type:"screen"},{from:[50,34],to:[52,80],type:"run"}]
},
{ id:"play-flexcont", cat:"team", name:"🏀 Flex Continuity", coach:"Ομαδική επίθεση",
  team:"5-man continuity", system:"Flex Continuity", emoji:"🏀", intensity:"—", kind:"play",
  summary:"Συνεχής (continuity) επίθεση flex: εναλλάξ flex screens στη γραμμή τέρματος & down screens ψηλά. Δίνει συνεχείς ευκαιρίες layup & σουτ, δύσκολη να μαρκαριστεί για 24''. Ιδανική για πειθαρχημένες ομάδες.",
  customPositions:[{r:"PG",x:70,y:44},{r:"SG",x:30,y:44},{r:"SF",x:10,y:84},{r:"PF",x:50,y:86},{r:"C",x:90,y:84}],
  phases:{
    offense:["Πάσα από πτέρυγα σε πτέρυγα (αντιστροφή).","Flex screen στη γραμμή τέρματος → cut στο καλάθι.","Down screen ψηλά για τον screener → σουτ.","Επανάληψη στην αντίθετη πλευρά (continuity)."],
    defense:["Vs switch → mismatch στη ρακέτα.","Αν κόψουν το flex → ανοιχτό σουτ ψηλά."],
    transition:["Δομημένη — ισορροπία εξασφαλισμένη."],
    special:["Χρονισμός των διαδοχικών μπλόκων.","Σκληρά, νόμιμα μπλόκα.","Πειθαρχία & υπομονή στη ροή."]
  },
  movements:[{from:[70,44],to:[30,44],type:"pass"},{from:[50,86],to:[62,86],type:"screen"},{from:[90,84],to:[64,86],type:"run"}]
},

/* ---- Έναρξη επίθεσης / Build-up ---- */
{ id:"play-drag", cat:"buildup", name:"⬆️ Drag Screen — Early PnR", coach:"Έναρξη επίθεσης",
  team:"Transition entry", system:"Drag", emoji:"⬆️", intensity:"—", kind:"play",
  summary:"Έναρξη επίθεσης σε μετάβαση: ο «trailer» ψηλός βάζει μπλόκο στον πλέι που ανεβάζει την μπάλα (drag screen), για άμεσο pick & roll πριν στηθεί η άμυνα. Γρήγορο πλεονέκτημα με ελάχιστη οργάνωση.",
  customPositions:[{r:"PG",x:50,y:22},{r:"C",x:60,y:34},{r:"SG",x:10,y:60},{r:"SF",x:90,y:60},{r:"PF",x:50,y:82}],
  phases:{
    offense:["Ο PG ανεβάζει τη μπάλα γρήγορα.","Ο trailer C βάζει drag screen στην κορυφή.","Άμεσο PnR — ο PG επιτίθεται.","Ο C roll· οι σουτέρ φαρδιά στις γωνίες."],
    defense:["Vs μη-στημένη άμυνα → επίθεση στο κενό.","Vs switch → mismatch attack."],
    transition:["Ήδη σε μετάβαση — πάτα το πλεονέκτημα."],
    special:["Ταχύτητα — πριν προλάβει η άμυνα.","Ο C σπριντάρει μπροστά (rim run/drag).","Γέμισμα διαδρόμων από σουτέρ."]
  },
  movements:[{from:[60,34],to:[50,26],type:"screen"},{from:[50,22],to:[42,44],type:"run"},{from:[60,34],to:[52,70],type:"run"}]
},
{ id:"play-zoom", cat:"buildup", name:"⬆️ Zoom — Pindown + DHO", coach:"Έναρξη επίθεσης",
  team:"Entry action", system:"Zoom", emoji:"⬆️", intensity:"—", kind:"play",
  summary:"Δημοφιλής έναρξη «zoom»: ο σουτέρ δέχεται pindown μπλόκο και συνεχίζει σε άμεσο dribble hand-off από τον ψηλό. Δύο μπλόκα στη σειρά — πολύ δύσκολο να μαρκαριστεί, δίνει σουτ ή drive σε ταχύτητα.",
  customPositions:[{r:"C",x:50,y:56},{r:"SG",x:30,y:84},{r:"PF",x:34,y:66},{r:"PG",x:80,y:44},{r:"SF",x:90,y:82}],
  phases:{
    offense:["Ο PF βάζει pindown στον SG (χαμηλά).","Ο SG ανεβαίνει & δέχεται DHO από τον C (zoom).","Ο SG επιτίθεται με ταχύτητα (σουτ ή drive).","Ο C roll μετά το handoff."],
    defense:["Vs top-lock → back-cut.","Vs switch → attack mismatch."],
    transition:["Ο PG κρατά την κορυφή για ισορροπία."],
    special:["Δύο σκληρά μπλόκα στη σειρά.","Ο SG «διαβάζει» πάνω/κάτω.","Ρυθμός — καμία στάση ανάμεσα στα μπλόκα."]
  },
  movements:[{from:[34,66],to:[34,78],type:"screen"},{from:[30,84],to:[46,54],type:"run"},{from:[50,56],to:[46,54],type:"pass"},{from:[50,56],to:[52,72],type:"screen"}]
},
{ id:"play-get", cat:"buildup", name:"⬆️ Get Action — Dribble-at", coach:"Έναρξη επίθεσης",
  team:"Entry action", system:"Get", emoji:"⬆️", intensity:"—", kind:"play",
  summary:"Απλή, αποτελεσματική έναρξη «get»: ο χειριστής κάνει dribble-at (ντριμπλάρει προς) έναν σουτέρ και του δίνει hand-back/handoff, μπαίνοντας σε PnR. Ξεκινά τη ροή & δημιουργεί πλεονέκτημα.",
  customPositions:[{r:"PG",x:64,y:40},{r:"SG",x:38,y:52},{r:"C",x:60,y:60},{r:"SF",x:10,y:82},{r:"PF",x:90,y:82}],
  phases:{
    offense:["Ο PG ντριμπλάρει προς τον SG (dribble-at).","Hand-off στον SG· ο PG κόβει (ή spot-up).","Ο C ανεβαίνει για PnR με τον SG.","Reads: σουτ, drive, roll ή kick."],
    defense:["Vs switch → mismatch.","Vs ice → επαναφορά/re-screen."],
    transition:["Ροή — οδηγεί σε motion/PnR."],
    special:["Ο dribble-at «σετάρει» τον αμυντικό.","Χαμηλή, προστατευμένη παραλαβή.","Απλότητα & ρυθμός."]
  },
  movements:[{from:[64,40],to:[42,50],type:"run"},{from:[38,52],to:[58,44],type:"run"},{from:[60,60],to:[52,48],type:"screen"}]
},
{ id:"play-pressbreak", cat:"buildup", name:"⬆️ Press Break — Σπάσιμο Πίεσης", coach:"Έναρξη επίθεσης", full:true,
  team:"Vs full-court press", system:"Press Break", emoji:"⬆️", intensity:"—", kind:"play",
  summary:"Πώς ΣΠΑΣ την πίεση ολόκληρου γηπέδου. Ασφαλής επαναφορά, παίκτης στη μέση του γηπέδου (middle), spacing & sprint μπροστά. Στόχος: να περάσεις την μπάλα και να δημιουργήσεις αριθμητικό πλεονέκτημα.",
  customPositions:[{r:"PG",x:50,y:8},{r:"SG",x:26,y:24},{r:"SF",x:74,y:24},{r:"PF",x:50,y:40},{r:"C",x:50,y:70}],
  phases:{
    offense:["Ασφαλής επαναφορά — ο καλύτερος χειριστής παίρνει τη μπάλα.","Ένας παίκτης «κάθεται» στη ΜΕΣΗ του γηπέδου (middle relief).","Spacing: μη μαζεύεστε — άνοιγμα για να σπάσει το trap.","Μόλις περάσει το πρώτο επίπεδο → sprint & 4v3/3v2 μπροστά."],
    defense:["Vs trap → βρες τον ελεύθερο πίσω από την πίεση (πάντα υπάρχει).","Ποτέ ντρίμπλα μέσα στο trap — πάσα πριν παγιδευτείς."],
    transition:["Επίθεση σε αριθμητικό πλεονέκτημα — τιμώρησε την πίεση."],
    special:["Μη σηκώνεις τη μπάλα ψηλά (turnover).","Ήρεμα & δυνατά — η πίεση θέλει πανικό.","Ο ψηλός τρέχει μπροστά (rim run) για εύκολο καλάθι."]
  },
  movements:[{from:[50,8],to:[26,24],type:"pass"},{from:[50,40],to:[50,28],type:"run"},{from:[26,24],to:[50,42],type:"pass"},{from:[50,70],to:[50,90],type:"run"}]
},

/* ---- Αμυντικές συνεργασίες (2 & 3 παικτών) ---- */
{ id:"play-def-drop", cat:"def", name:"🛡️ PnR: Drop Coverage (2)", coach:"Αμυντική συνεργασία", ball:{x:50,y:36},
  team:"2-man defense", system:"Drop", emoji:"🛡️", intensity:"—", kind:"play",
  summary:"Άμυνα στο pick & roll με τον ψηλό να «κάθεται» κάτω (drop): προστατεύει τη ρακέτα & τον roller, δίνει το μακρινό δίποντο. Ο on-ball αμυντικός κυνηγά πάνω από το μπλόκο (chase). Χαμηλού ρίσκου.",
  customPositions:[{r:"PG",x:50,y:44},{r:"C",x:50,y:60},{r:"SG",x:20,y:56},{r:"SF",x:80,y:56},{r:"PF",x:50,y:76}],
  phases:{
    offense:["Ο on-ball (PG) κυνηγά ΠΑΝΩ από το μπλόκο (over).","Ο C «κάθεται» κάτω (drop) — προστατεύει καλάθι & roller.","Ο C ανεβαίνει στο ύψος του ελεύθερου (show at level).","Ο on-ball επιστρέφει γρήγορα (recover) στον κάτοχο."],
    defense:["Δίνεις: μακρινό δίποντο / floater — τα «κακά» σουτ.","Στεγνώνεις: καλάθι & τρίποντο."],
    transition:["Ο C τελειώνει με αμυντικό ριμπάουντ."],
    special:["Ο C «δείχνει» χωρίς να φεύγει από τον roller.","On-ball: κολλητά, πάνω από το μπλόκο.","Επικοινωνία: «drop! drop!»"]
  },
  movements:[{from:[50,44],to:[45,54],type:"run"},{from:[50,60],to:[50,54],type:"run"}]
},
{ id:"play-def-hedge", cat:"def", name:"🛡️ PnR: Hedge / Show (2)", coach:"Αμυντική συνεργασία", ball:{x:50,y:36},
  team:"2-man defense", system:"Hedge", emoji:"🛡️", intensity:"—", kind:"play",
  summary:"Ο ψηλός βγαίνει επιθετικά (hedge/show) μπροστά από τον χειριστή για να τον καθυστερήσει, δίνοντας χρόνο στον on-ball να επανέλθει. Μετά ο ψηλός κάνει recover στον roller. Πιο επιθετικό από το drop.",
  customPositions:[{r:"PG",x:50,y:44},{r:"C",x:52,y:52},{r:"SG",x:20,y:56},{r:"SF",x:80,y:56},{r:"PF",x:50,y:78}],
  phases:{
    offense:["Ο C βγαίνει «show/hedge» μπροστά στον χειριστή (καθυστέρηση).","Ο on-ball περνά πάνω από το μπλόκο & επανέρχεται.","Ο C κάνει recover στον roller (sprint πίσω).","Οι υπόλοιποι σε «stunt & recover» στους σουτέρ."],
    defense:["Ρίσκο: αν αργήσει το recover → ελεύθερος roller.","Καλό ενάντια σε δυνατούς σουτέρ-χειριστές."],
    transition:["Προσοχή: το hedge εκθέτει — γρήγορες rotations."],
    special:["Σύντομο, επιθετικό hedge (όχι μακριά).","Ο on-ball «κολλάει» για να μη γίνει 4v3.","Επικοινωνία & γρήγορο recover."]
  },
  movements:[{from:[52,52],to:[50,44],type:"run"},{from:[50,44],to:[46,52],type:"run"},{from:[52,52],to:[52,70],type:"run"}]
},
{ id:"play-def-switch", cat:"def", name:"🛡️ PnR: Switch (2)", coach:"Αμυντική συνεργασία", ball:{x:50,y:36},
  team:"2-man defense", system:"Switch", emoji:"🛡️", intensity:"—", kind:"play",
  summary:"Οι δύο αμυντικοί ανταλλάσσουν αντιπάλους στο μπλόκο (switch): σβήνει το πλεονέκτημα του pick & roll χωρίς rotations. Προϋποθέτει ευέλικτους, «switchable» παίκτες. Προσοχή στο mismatch που δημιουργείται.",
  customPositions:[{r:"PG",x:50,y:44},{r:"C",x:56,y:50},{r:"SG",x:20,y:56},{r:"SF",x:80,y:56},{r:"PF",x:50,y:78}],
  phases:{
    offense:["Στην επαφή του μπλόκου → «switch!» — αλλάζουν αντιπάλους.","Ο C αναλαμβάνει τον χειριστή, ο PG τον roller.","Καμία rotation — η άμυνα μένει «κλειστή».","Ο PG «σφραγίζει» τον ψηλό (box-out) στο ριμπάουντ."],
    defense:["Ρίσκο: mismatch (μικρός σε ψηλό / ψηλός σε γρήγορο).","Vs mismatch → «dig»/βοήθεια στο post ή pre-switch."],
    transition:["Έτοιμοι για γρήγορη αλλαγή στο ριμπάουντ."],
    special:["Νωρίς & δυνατά η φωνή «switch».","Ενεργά χέρια στο mismatch.","Απόφυγε το switch αν το mismatch είναι μεγάλο."]
  },
  movements:[{from:[50,44],to:[52,50],type:"run"},{from:[56,50],to:[50,44],type:"run"}]
},
{ id:"play-def-blitz", cat:"def", name:"🛡️ PnR: Blitz / Trap (2→3)", coach:"Αμυντική συνεργασία", ball:{x:50,y:36},
  team:"2 & 3-man defense", system:"Blitz", emoji:"🛡️", intensity:"—", kind:"play",
  summary:"Διπλή πίεση (blitz/trap) στον χειριστή: on-ball + ψηλός τον παγιδεύουν και τον αναγκάζουν να δώσει τη μπάλα. Οι υπόλοιποι τρεις κάνουν rotation (X-out) για να καλύψουν τον ελεύθερο 4v3.",
  customPositions:[{r:"PG",x:50,y:44},{r:"C",x:52,y:48},{r:"SG",x:22,y:58},{r:"PF",x:50,y:72},{r:"SF",x:80,y:58}],
  phases:{
    offense:["On-ball + C παγιδεύουν (trap) τον χειριστή.","Ο χειριστής αναγκάζεται σε πάσα (χάνει ντρίμπλα).","Ο κοντινός (PF) «tag»-άρει τον roller.","X-out rotation: οι υπόλοιποι καλύπτουν τους σουτέρ."],
    defense:["Ρίσκο: 4v3 — χρειάζεται τέλειο rotation.","Καλό σε αστέρες-χειριστές / κρίσιμες φάσεις."],
    transition:["Αν κερδηθεί → άμεση αντεπίθεση από το trap."],
    special:["Σκληρό, «ερμητικό» trap (χέρια ψηλά).","Nail/low man tag στον roller.","Επικοινωνία & sprint στα rotations."]
  },
  movements:[{from:[52,48],to:[50,42],type:"run"},{from:[50,72],to:[50,60],type:"run"},{from:[80,58],to:[60,66],type:"run"}]
},
{ id:"play-def-ice", cat:"def", name:"🛡️ PnR: ICE (πλάγιο) (2)", coach:"Αμυντική συνεργασία", ball:{x:78,y:44},
  team:"2-man defense", system:"ICE", emoji:"🛡️", intensity:"—", kind:"play",
  summary:"Στο πλάγιο pick & roll ο on-ball «κόβει» το μπλόκο (ICE/down) σπρώχνοντας τον χειριστή προς τη γραμμή/baseline, μακριά από το κέντρο. Ο ψηλός τον περιμένει· ο χειριστής «πνίγεται» στη γωνία.",
  customPositions:[{r:"PG",x:78,y:52},{r:"C",x:74,y:64},{r:"SG",x:30,y:56},{r:"SF",x:14,y:80},{r:"PF",x:52,y:78}],
  phases:{
    offense:["On-ball «icing»: κόβει το μπλόκο, σπρώχνει προς τη γραμμή.","Ο C περιμένει στη γραμμή (contain), όχι στο κέντρο.","Ο χειριστής οδηγείται στη «νεκρή» ζώνη (baseline).","Weak-side βοήθεια έτοιμη για το roll."],
    defense:["Δίνεις: πλάγιο/baseline, όχι μεσαίο.","Αν φύγει μεσαία → «σπασμένο» ice, rotation."],
    transition:["Contain → αμυντικό ριμπάουντ → push."],
    special:["Σώμα στη γραμμή του μπλόκου (force sideline).","Ο C «κτίζει τοίχο» στη γραμμή.","Επικοινωνία «ice! ice!»"]
  },
  movements:[{from:[78,52],to:[82,58],type:"run"},{from:[74,64],to:[78,60],type:"run"}]
},
{ id:"play-def-tag", cat:"def", name:"🛡️ Help — Tag the Roller / X-out (3)", coach:"Αμυντική συνεργασία", ball:{x:50,y:36},
  team:"3-man defense", system:"Help & Rotate", emoji:"🛡️", intensity:"—", kind:"play",
  summary:"Αμυντική συνεργασία 3 παικτών: ο «χαμηλός βοηθός» (low man/nail) «ταγκάρει» τον roller για να τον καθυστερήσει, και μετά γίνεται X-out rotation ώστε να καλυφθεί ο ελεύθερος σουτέρ. Η ψυχή της ομαδικής άμυνας.",
  customPositions:[{r:"PG",x:50,y:46},{r:"C",x:50,y:58},{r:"PF",x:24,y:66},{r:"SG",x:10,y:80},{r:"SF",x:82,y:60}],
  phases:{
    offense:["Στο roll, ο χαμηλός βοηθός (PF) «tag»-άρει τον roller.","Καθυστερεί τον roller μέχρι να επανέλθει ο ψηλός.","X-out: ο PF & ο κοντινός αλλάζουν & καλύπτουν τους σουτέρ.","Closeout στον ελεύθερο — χωρίς φάουλ."],
    defense:["«Δίνεις 2 για να πάρεις 1»: προστασία ρακέτας πρώτα.","Vs skip → μακρύ closeout, high hands."],
    transition:["Τελείωμα με box-out & ριμπάουντ."],
    special:["Νωρίς το tag — «δείξε» στον roller.","Sprint στο closeout, χαμηλός.","Φωνή: «tag! X-out!»"]
  },
  movements:[{from:[24,66],to:[42,66],type:"run"},{from:[24,66],to:[12,78],type:"run"},{from:[10,80],to:[24,66],type:"run"}]
},

/* ---- Έναρξη πίεσης (Press) ---- */
{ id:"play-press-trap1211", cat:"press", name:"🕸️ Έναρξη: 1-2-1-1 Trap", coach:"Έναρξη πίεσης", full:true,
  team:"Full-court press", system:"1-2-1-1 Press (Full)", emoji:"🕸️", intensity:"—", kind:"play",
  summary:"Πώς ΞΕΚΙΝΑΣ την πίεση 1-2-1-1: trigger μετά από δικό σου καλάθι. Ο μπροστινός υπαγορεύει την επαναφορά προς τη γωνία, οι δύο wings παγιδεύουν την πρώτη πάσα, ο μεσαίος «διαβάζει» για κλέψιμο.",
  customPositions:[{r:"PG",x:50,y:88},{r:"SG",x:26,y:78},{r:"SF",x:74,y:78},{r:"PF",x:50,y:64},{r:"C",x:50,y:40}],
  phases:{
    offense:["Trigger: μετά από made basket, όλοι στις θέσεις πίεσης.","Ο μπροστινός (PG) υπαγορεύει την επαναφορά στη γωνία.","Οι wings (SG/SF) παγιδεύουν την πρώτη πάσα.","Ο μεσαίος (PF) διαβάζει & κλέβει· ο C safety."],
    defense:["Στόχος: 8'' violation, κλέψιμο, βιασύνη.","Vs καλό break → πτώση σε half-court άμυνα."],
    transition:["Κλέψιμο → άμεσοι εύκολοι πόντοι."],
    special:["Force sideline — ποτέ μέση.","Trap ερμητικό, χέρια ψηλά.","Ο safety ΠΟΤΕ δεν αφήνει layup πίσω."]
  },
  movements:[{from:[50,88],to:[36,84],type:"run"},{from:[26,78],to:[36,82],type:"screen"},{from:[74,78],to:[60,82],type:"run"}]
},
{ id:"play-press-221", cat:"press", name:"🕸️ Έναρξη: 2-2-1 Force Sideline", coach:"Έναρξη πίεσης", full:true,
  team:"Full/3-4 court press", system:"2-2-1 Press (Full)", emoji:"🕸️", intensity:"—", kind:"play",
  summary:"Ελεγχόμενη έναρξη πίεσης 2-2-1: οι δύο μπροστινοί «οδηγούν» τη μπάλα σε μία πλάγια, οι δύο μεσαίοι παγιδεύουν κοντά στη μεσαία γραμμή. Χαμηλού ρίσκου — κερδίζει χρόνο & κουράζει.",
  customPositions:[{r:"PG",x:30,y:84},{r:"SG",x:70,y:84},{r:"SF",x:24,y:62},{r:"PF",x:76,y:62},{r:"C",x:50,y:40}],
  phases:{
    offense:["Οι δύο μπροστινοί «σπρώχνουν» τη μπάλα στη μία πλάγια.","Ο κοντινός μεσαίος παγιδεύει στη μεσαία γραμμή.","Πλάγια + μεσαία γραμμή = «τοίχοι» της παγίδας.","Ο C safety διαβάζει τη μεγάλη πάσα."],
    defense:["Λιγότερο ρίσκο από 1-2-1-1 — καλό για προβάδισμα.","Αν σπάσει → οργανωμένη πτώση."],
    transition:["Κλέψιμο → γρήγορη επίθεση."],
    special:["Force sideline & κράτα εκεί.","Trap στη μεσαία (backcourt violation).","Ενέργεια & επικοινωνία."]
  },
  movements:[{from:[30,84],to:[40,80],type:"run"},{from:[70,84],to:[60,80],type:"run"},{from:[24,62],to:[40,66],type:"run"}]
},
{ id:"play-press-runjump", cat:"press", name:"🕸️ Έναρξη: Run & Jump", coach:"Έναρξη πίεσης", full:true,
  team:"Man press", system:"Full-Court Man Press", emoji:"🕸️", intensity:"—", kind:"play",
  summary:"Επιθετική man-to-man πίεση όλο το γήπεδο με «run & jump»: ένας δεύτερος αμυντικός «πηδά» ξαφνικά τον χειριστή (surprise trap/switch) ενώ ο πρώτος αλλάζει αντίπαλο. Δημιουργεί χάος & κλεψίματα.",
  customPositions:[{r:"PG",x:50,y:86},{r:"SG",x:24,y:74},{r:"SF",x:76,y:74},{r:"PF",x:36,y:56},{r:"C",x:64,y:48}],
  phases:{
    offense:["Man-to-man πίεση σε όλο το μήκος (deny επαναφορά).","Ξαφνικά ένας δεύτερος «πηδά» τον χειριστή (jump).","Ο πρώτος αμυντικός αλλάζει στον ελεύθερο (rotate).","Στόχος: αιφνιδιασμός, βιασύνη, κλέψιμο."],
    defense:["Ρίσκο: αν διαβαστεί → αριθμητικό μειονέκτημα.","Χρειάζεται ένταση & αθλητικότητα."],
    transition:["Κλέψιμο → άμεση αντεπίθεση."],
    special:["Timing του «jump» — απρόβλεπτο.","Ενεργά χέρια & γρήγορα πόδια.","Επικοινωνία στις εναλλαγές."]
  },
  movements:[{from:[36,56],to:[48,80],type:"run"},{from:[50,86],to:[36,58],type:"run"},{from:[24,74],to:[40,80],type:"run"}]
},
{ id:"play-press-131half", cat:"press", name:"🕸️ Έναρξη: 1-3-1 Half-Court Trap", coach:"Έναρξη πίεσης",
  team:"Half-court trap", system:"1-3-1 Zone (Άμυνα)", emoji:"🕸️", intensity:"—", kind:"play",
  summary:"Παγιδευτική άμυνα ημιγηπέδου 1-3-1: πιέζει ψηλά, παγιδεύει στις πτέρυγες & στις γωνίες, αναγκάζει λάθη & δύσκολα σουτ. Καλή «αλλαγή εικόνας» — απορυθμίζει τον ρυθμό του αντιπάλου.",
  customPositions:[{r:"PG",x:50,y:44},{r:"SG",x:20,y:62},{r:"PF",x:50,y:60},{r:"SF",x:80,y:62},{r:"C",x:50,y:84}],
  phases:{
    offense:["Ο κορυφαίος (PG) πιέζει & οδηγεί τη μπάλα στην πτέρυγα.","Trap στην πτέρυγα/γωνία (PG + πλάγιος).","Ο μεσαίος (PF) & ο βασικός (C) καλύπτουν high-low.","Ενεργά χέρια στις γραμμές πάσας — deflections."],
    defense:["Ευάλωτη: high post & αντιστροφή (skip).","Ρίσκο στο ριμπάουντ — box-out πειθαρχία."],
    transition:["Deflection/κλέψιμο → αντεπίθεση."],
    special:["Trap στη γωνία = «η δεύτερη άμυνα».","Ανάγκασε αντιστροφές (χρόνος).","Άλλαξέ τη μετά από κάθε made basket."]
  },
  movements:[{from:[50,44],to:[30,56],type:"run"},{from:[20,62],to:[28,64],type:"run"},{from:[50,60],to:[36,60],type:"run"}]
},

/* ===== ΕΠΙΠΛΕΟΝ ΣΥΝΕΡΓΑΣΙΕΣ ===== */

/* -- Στημένες: κλασικά off-ball actions -- */
{ id:"play-floppy", cat:"setplay", name:"📋 Floppy — Επιλογή Σουτέρ", coach:"Στημένη Φάση", pos:["SG","C","PF"],
  team:"Off-ball action", system:"Floppy", emoji:"📋", intensity:"—", kind:"play",
  summary:"Ο σουτέρ ξεκινά κάτω από το καλάθι και «διαβάζει» την άμυνα: από τη μία πλευρά έχει ένα μπλόκο (single), από την άλλη διπλό (double). Επιλέγει ελεύθερα πού θα βγει για καθαρό catch & shoot.",
  customPositions:[{r:"PG",x:50,y:34},{r:"SG",x:50,y:92},{r:"C",x:36,y:70},{r:"PF",x:62,y:70},{r:"SF",x:66,y:80}],
  phases:{
    offense:["Ο SG ξεκινά κάτω από το καλάθι.","Διαβάζει: single μπλόκο αριστερά, double δεξιά.","Βγαίνει στην «ανοιχτή» πλευρά για catch & shoot.","Πάσα του PG στον σουτέρ."],
    defense:["Vs top-lock → back-cut στο καλάθι.","Vs switch → ο screener slip."],
    transition:[],
    special:["Ο σουτέρ αποφασίζει, δεν προτρέχει.","Σκληρά μπλόκα.","Πόδια έτοιμα πριν την πάσα."]
  },
  movements:[{from:[36,70],to:[30,64],type:"screen"},{from:[50,92],to:[18,58],type:"run"},{from:[50,34],to:[18,58],type:"pass"}]
},
{ id:"play-elevator", cat:"setplay", name:"📋 Elevator Doors", coach:"Στημένη Φάση", pos:["SG","PF","C"],
  team:"Off-ball action", system:"Elevator", emoji:"📋", intensity:"—", kind:"play",
  summary:"Δύο ψηλοί σχηματίζουν «πόρτες»: ο σουτέρ περνά ανάμεσά τους και μόλις περάσει, οι δύο «κλείνουν» (elevator) εγκλωβίζοντας τον αμυντικό. Θεαματικό & αποτελεσματικό για καθαρό τρίποντο.",
  customPositions:[{r:"PG",x:50,y:34},{r:"SG",x:50,y:86},{r:"PF",x:44,y:60},{r:"C",x:56,y:60},{r:"SF",x:88,y:54}],
  phases:{
    offense:["Ο SG ανεβαίνει προς την κορυφή ανάμεσα στους δύο ψηλούς.","Μόλις περάσει, PF & C «κλείνουν τις πόρτες».","Ο αμυντικός εγκλωβίζεται πίσω — καθαρό σουτ.","Πάσα του PG στον SG."],
    defense:["Vs switch → ο ένας ψηλός κυλάει.","Vs deny → back-cut."],
    transition:[],
    special:["Τέλειος συγχρονισμός στο «κλείσιμο».","Ο σουτέρ τρέχει σε ευθεία.","Νόμιμα, σταθερά μπλόκα (χωρίς κίνηση)."]
  },
  movements:[{from:[50,86],to:[50,52],type:"run"},{from:[44,60],to:[47,56],type:"screen"},{from:[56,60],to:[53,56],type:"screen"},{from:[50,34],to:[50,52],type:"pass"}]
},
{ id:"play-iverson", cat:"setplay", name:"📋 Iverson Cut", coach:"Στημένη Φάση", pos:["SF","SG"],
  team:"Entry action", system:"Iverson", emoji:"📋", intensity:"—", kind:"play",
  summary:"Ο κύριος σκόρερ (wing) κόβει οριζόντια πάνω από τα δύο elbows χρησιμοποιώντας μπλόκα των ψηλών (Iverson cut), για να δεχθεί σε ρυθμό και να μπει σε PnR ή iso — κλασική έναρξη για τον πρώτο σκόρερ.",
  customPositions:[{r:"PG",x:78,y:44},{r:"SF",x:10,y:60},{r:"PF",x:38,y:58},{r:"C",x:62,y:58},{r:"SG",x:90,y:82}],
  phases:{
    offense:["Ο SF ξεκινά αριστερή πτέρυγα.","Κόβει οριζόντια πάνω από τα elbows (μπλόκα PF & C).","Δέχεται τη μπάλα σε κίνηση δεξιά.","Συνέχεια: iso ή άμεσο PnR."],
    defense:["Vs deny → back-cut στο καλάθι.","Vs switch → attack mismatch."],
    transition:[],
    special:["Ο wing κόβει με ρυθμό & αλλαγή ταχύτητας.","Σκληρά elbow μπλόκα.","Οδηγεί φυσικά σε δεύτερη δράση."]
  },
  movements:[{from:[38,58],to:[42,54],type:"screen"},{from:[62,58],to:[58,54],type:"screen"},{from:[10,60],to:[62,50],type:"run"},{from:[78,44],to:[62,50],type:"pass"}]
},

/* -- Συνεργασίες 2 παικτών (επιπλέον) -- */
{ id:"play-rescreen", cat:"off2", name:"🤝 Re-screen / Step-up", coach:"Συνεργασία 2 παικτών", pos:["PG","C"], ball:{x:50,y:36},
  team:"2-man game", system:"Re-screen", emoji:"🤝", intensity:"—", kind:"play",
  summary:"Όταν η άμυνα αμυνθεί καλά το πρώτο μπλόκο, ο ψηλός ξαναμπλοκάρει αμέσως (re-screen), συχνά από την αντίθετη πλευρά (step-up). Δεύτερη προσπάθεια που «σπάει» την αμυντική τοποθέτηση.",
  customPositions:[{r:"PG",x:50,y:36},{r:"C",x:58,y:50},{r:"SG",x:8,y:82},{r:"SF",x:92,y:82},{r:"PF",x:14,y:54}],
  phases:{
    offense:["Πρώτο ballscreen — η άμυνα το κρατά.","Ο C ξαναμπλοκάρει άμεσα (re-screen/step-up).","Ο PG αλλάζει κατεύθυνση & επιτίθεται.","Ο C roll ή pop."],
    defense:["Vs drop → pull-up.","Vs switch → mismatch."],
    transition:[],
    special:["Γρήγορο re-screen — μη δίνεις χρόνο.","Άλλαξε γωνία επίθεσης.","Επιμονή & ρυθμός."]
  },
  movements:[{from:[58,50],to:[48,42],type:"screen"},{from:[58,50],to:[54,40],type:"screen"},{from:[50,36],to:[42,52],type:"run"}]
},
{ id:"play-postup", cat:"off2", name:"🤝 Post-Up + Duck-in", coach:"Συνεργασία 2 παικτών", pos:["C","PF"],
  team:"2-man game", system:"Post-Up", emoji:"🤝", intensity:"—", kind:"play",
  summary:"Κλασικό εσωτερικό παιχνίδι: είσοδος στον ψηλό στο post με σωστό «κλείδωμα» (seal), ενώ ο δεύτερος ψηλός κάνει duck-in στη ρακέτα. Εκμετάλλευση mismatch & δύναμης κοντά στο καλάθι.",
  customPositions:[{r:"PG",x:50,y:36},{r:"C",x:40,y:80},{r:"SG",x:12,y:80},{r:"SF",x:86,y:54},{r:"PF",x:66,y:64}],
  phases:{
    offense:["Ο C «κλειδώνει» (seal) τον αμυντικό στο post.","Είσοδος πάσας στον C.","Ο PF κάνει duck-in από την αδύναμη πλευρά.","Reads: post move, kick-out στο double, ή high-low στον PF."],
    defense:["Vs double → πάσα στον ελεύθερο σουτέρ.","Vs fronting → high-low lob."],
    transition:[],
    special:["Δυνατό seal πριν την πάσα.","Καθαρή γωνία εισόδου (όχι στη γραμμή).","Υπομονή & ανάγνωση της βοήθειας."]
  },
  movements:[{from:[50,36],to:[40,80],type:"pass"},{from:[40,80],to:[44,86],type:"run"},{from:[66,64],to:[58,82],type:"run"}]
},

/* -- Συνεργασίες 3 παικτών (επιπλέον) -- */
{ id:"play-spain", cat:"off3", name:"👥 Spain PnR (Stack)", coach:"Συνεργασία 3 παικτών", pos:["PG","C","PF"], ball:{x:50,y:34},
  team:"3-man game", system:"Spain PnR", emoji:"👥", intensity:"—", kind:"play",
  summary:"Μοντέρνα, θανατηφόρα συνεργασία: κλασικό PnR, αλλά ένας τρίτος παίκτης βάζει back-screen (lob) στον αμυντικό του roller. Ο ψηλός κόβει για alley-oop, ο screener «ανοίγει» για τρίποντο — τριπλή απειλή.",
  customPositions:[{r:"PG",x:50,y:34},{r:"C",x:56,y:48},{r:"PF",x:50,y:66},{r:"SG",x:8,y:82},{r:"SF",x:92,y:82}],
  phases:{
    offense:["Ο C βάζει ballscreen στον PG.","Ο C κάνει roll — ο PF βάζει back-screen στον αμυντικό του C.","Ο C κόβει ελεύθερος για lob/layup.","Ο PF «ανοίγει» (pop) για τρίποντο μετά το screen."],
    defense:["Vs switch → mismatch / ο C κυλάει.","Vs tag → ο PF ελεύθερος για σουτ."],
    transition:[],
    special:["Timing: το back-screen τη στιγμή του roll.","Ψηλή, έγκαιρη πάσα (lob).","Δύσκολο να μαρκαριστεί — πολλές απειλές."]
  },
  movements:[{from:[56,48],to:[48,40],type:"screen"},{from:[56,48],to:[52,74],type:"run"},{from:[50,66],to:[52,58],type:"screen"},{from:[50,66],to:[50,40],type:"run"}]
},
{ id:"play-doubledrag", cat:"off3", name:"👥 Double Drag", coach:"Συνεργασία 3 παικτών", pos:["PG","PF","C"],
  team:"Early offense", system:"Double Drag", emoji:"👥", intensity:"—", kind:"play",
  summary:"Δύο διαδοχικά «drag» μπλόκα στον χειριστή σε μετάβαση/αρχή επίθεσης. Ο πρώτος ψηλός ανοίγει (pop), ο δεύτερος κόβει (roll) — δίνει άμεσο πλεονέκτημα πριν στηθεί η άμυνα.",
  customPositions:[{r:"PG",x:50,y:24},{r:"PF",x:44,y:34},{r:"C",x:58,y:38},{r:"SG",x:10,y:60},{r:"SF",x:90,y:60}],
  phases:{
    offense:["Ο PG ανεβάζει· δύο διαδοχικά drag screens (PF, C).","Ο πρώτος (PF) ανοίγει (pop) στην κορυφή.","Ο δεύτερος (C) κόβει (roll) στο καλάθι.","Reads: pull-up, pass στον pop ή lob στον roll."],
    defense:["Vs drop → σουτ ή pass στον pop.","Vs switch → mismatch attack."],
    transition:[],
    special:["Ταχύτητα — παίζεται νωρίς.","Καθαρές γωνίες στα δύο μπλόκα.","Spacing από τους σουτέρ στις γωνίες."]
  },
  movements:[{from:[44,34],to:[48,28],type:"screen"},{from:[58,38],to:[52,30],type:"screen"},{from:[50,24],to:[44,44],type:"run"},{from:[58,38],to:[54,70],type:"run"}]
},

/* -- Ομαδική επίθεση: Zone Offense -- */
{ id:"play-zone-overload", cat:"team", name:"🏀 Zone Offense — Overload vs 2-3", coach:"Επίθεση κατά ζώνης", pos:["PG","SG","SF","PF","C"],
  team:"Vs 2-3 zone", system:"Zone Overload", emoji:"🏀", intensity:"—", kind:"play",
  summary:"Επίθεση κατά ζώνης 2-3 με «υπερφόρτωση» (overload) της μιας πλευράς: 4 απειλές σε μία πλευρά αναγκάζουν τη ζώνη να μετακινηθεί, και μια γρήγορη skip πάσα βρίσκει τον ελεύθερο στην αδύναμη πλευρά.",
  customPositions:[{r:"PG",x:50,y:36},{r:"SG",x:84,y:52},{r:"SF",x:90,y:82},{r:"PF",x:50,y:62},{r:"C",x:60,y:86}],
  phases:{
    offense:["Overload τη μία πλευρά (γκαρντ + γωνία + high post + short corner).","Κυκλοφορία που «κουνά» τη ζώνη.","Ο C flash στο short corner (τραβά τον κάτω αμυντικό).","Skip πάσα στην αδύναμη πλευρά → ανοιχτό τρίποντο."],
    defense:["Vs μετατόπιση ζώνης → skip & extra pass.","Ψάξε τα «κενά» (gaps) ανάμεσα στους αμυντικούς."],
    transition:[],
    special:["Πάσα γρήγορη — η μπάλα ταξιδεύει πιο γρήγορα από τη ζώνη.","Μπες στα gaps, όχι πάνω σε αμυντικό.","Επιθετικό ριμπάουντ (η ζώνη δεν κάνει box-out καλά)."]
  },
  movements:[{from:[50,36],to:[84,52],type:"pass"},{from:[60,86],to:[74,80],type:"run"},{from:[84,52],to:[16,56],type:"pass"}]
},
{ id:"play-zone-highpost", cat:"team", name:"🏀 Zone Offense — High Post & Short Corner", coach:"Επίθεση κατά ζώνης", pos:["PF","C","PG"],
  team:"Vs 2-3 zone", system:"Zone High-Low", emoji:"🏀", intensity:"—", kind:"play",
  summary:"Χτύπημα στην «καρδιά» της 2-3 ζώνης: παίκτης στο high post (κέντρο) & παίκτης στο short corner. Όταν η μπάλα μπει στο high post, η ζώνη «σπάει» — προκύπτουν high-low, kick-outs και layups.",
  customPositions:[{r:"PG",x:50,y:34},{r:"SG",x:20,y:56},{r:"SF",x:80,y:56},{r:"PF",x:50,y:60},{r:"C",x:62,y:84}],
  phases:{
    offense:["Είσοδος πάσας στον PF στο high post (κέντρο ζώνης).","Ο PF γυρίζει & «διαβάζει»: high-low στον C ή kick-out.","Ο C στο short corner τραβά τον κάτω αμυντικό.","Layup, τρίποντο γωνίας ή high-low."],
    defense:["Vs κλείσιμο ρακέτας → kick-out στους σουτέρ.","Vs βοήθεια στον C → high-low ή γωνία."],
    transition:[],
    special:["Ο high post «βλέπει» όλο το γήπεδο.","Γρήγορη απόφαση — η ζώνη αναδιπλώνεται.","Σουτέρ έτοιμοι στις γωνίες."]
  },
  movements:[{from:[50,34],to:[50,60],type:"pass"},{from:[50,60],to:[62,82],type:"pass"},{from:[20,56],to:[12,80],type:"run"}]
},

/* -- Build-up (επιπλέον) -- */
{ id:"play-horns-entry", cat:"buildup", name:"⬆️ Horns Entry — Έναρξη", coach:"Έναρξη επίθεσης", pos:["PG","PF","C"],
  team:"Entry", system:"1-4 High", emoji:"⬆️", intensity:"—", kind:"play",
  summary:"Η πιο ευέλικτη έναρξη επίθεσης: δύο ψηλοί στα elbows, δύο σουτέρ στις γωνίες, χειριστής στην κορυφή (Horns/1-4 high). Ανοίγει άπειρες συνέχειες: PnR, pop, roll, hand-off, back-screen.",
  customPositions:[{r:"PG",x:50,y:32},{r:"PF",x:38,y:58},{r:"C",x:62,y:58},{r:"SG",x:14,y:60},{r:"SF",x:86,y:60}],
  phases:{
    offense:["Στήσιμο 1-4 high (δύο elbows, δύο γωνίες).","Ο PG διαλέγει πλευρά PnR με τον έναν ψηλό.","Ο άλλος ψηλός: pop, roll ή re-screen.","Reads → συνέχεια σε Horns action (flare/down)."],
    defense:["Vs σκληρή άμυνα PnR → δεύτερος ψηλός.","Vs switch → mismatch."],
    transition:["Ο μη-εμπλεκόμενος ψηλός κρατά ισορροπία."],
    special:["Καθαρά, σταθερά elbow μπλόκα.","Spacing από τις δύο γωνίες.","Ευελιξία — διάβασε & αποφάσισε."]
  },
  movements:[{from:[38,58],to:[46,44],type:"screen"},{from:[50,32],to:[42,50],type:"run"},{from:[62,58],to:[66,46],type:"run"}]
},

/* -- Αμυντικές συνεργασίες (επιπλέον) -- */
{ id:"play-def-nail", cat:"def", name:"🛡️ Nail / Gap Help (2-3)", coach:"Αμυντική συνεργασία", pos:["PG","SF"], ball:{x:78,y:52},
  team:"2 & 3-man defense", system:"Nail Help", emoji:"🛡️", intensity:"—", kind:"play",
  summary:"Ο βοηθός στο «nail» (κέντρο της γραμμής βολών) «κλέβει» χώρο (gap/stunt) στη διείσδυση, καθυστερεί τον κάτοχο και επιστρέφει (recover) στον δικό του. Η βάση της ομαδικής άμυνας «one pass away».",
  customPositions:[{r:"SF",x:74,y:54},{r:"PG",x:50,y:52},{r:"SG",x:22,y:56},{r:"PF",x:50,y:72},{r:"C",x:52,y:84}],
  phases:{
    offense:["Ο on-ball (SF) πιέζει & κατευθύνει τον κάτοχο.","Ο nail-βοηθός (PG) «δείχνει» (stunt) στη διείσδυση.","Καθυστερεί τον κάτοχο & επιστρέφει (recover).","«Ένας-πάσα-μακριά» = θέση βοήθειας, όχι κολλητά."],
    defense:["Vs kick-out → κλειστό closeout, high hands.","Vs drive-by → η επόμενη βοήθεια (rotate)."],
    transition:[],
    special:["Ένα πόδι στη ρακέτα, μάτια σε μπάλα & αντίπαλο.","Stunt & recover, όχι υπερ-δέσμευση.","Φωνή: «help! I'm here!»"]
  },
  movements:[{from:[50,52],to:[60,56],type:"run"},{from:[60,56],to:[50,52],type:"run"}]
},
{ id:"play-def-post", cat:"def", name:"🛡️ Post Defense — Fronting / 3/4", coach:"Αμυντική συνεργασία", pos:["C","PF"], ball:{x:78,y:54},
  team:"2 & 3-man defense", system:"Post D", emoji:"🛡️", intensity:"—", kind:"play",
  summary:"Άμυνα στον ψηλό στο post: fronting (μπροστά) ή 3/4 (πλάγια) για να εμποδίσεις την είσοδο της πάσας, με τον αδύναμο ψηλό έτοιμο για help («dig»/2-3 defense) στο lob.",
  customPositions:[{r:"C",x:44,y:80},{r:"PF",x:56,y:72},{r:"PG",x:78,y:50},{r:"SG",x:24,y:56},{r:"SF",x:50,y:40}],
  phases:{
    offense:["Ο C μαρκάρει fronting ή 3/4 τον post (κόβει την είσοδο).","Ο αδύναμος ψηλός (PF) «καλύπτει την πλάτη» (help vs lob).","Vs lob → ο PF κλείνει, ο C ανακτά θέση.","Στο double → σαφές rotation στους σουτέρ."],
    defense:["Vs high-low → ο PF παίρνει τον lob.","Vs kick-out → closeout & recover."],
    transition:[],
    special:["Σώμα ανάμεσα σε μπάλα & post.","Δυνατά πόδια, χαμηλό κέντρο.","Επικοινωνία για το lob (weak-side)."]
  },
  movements:[{from:[44,80],to:[42,84],type:"run"},{from:[56,72],to:[50,82],type:"run"}]
},
{ id:"play-def-closeout", cat:"def", name:"🛡️ Closeout & Contest 1v1", coach:"Αμυντική συνεργασία", pos:["SG","SF","PG"], ball:{x:84,y:56},
  team:"Ατομική/2-man defense", system:"Closeout", emoji:"🛡️", intensity:"—", kind:"play",
  summary:"Μετά από βοήθεια & kick-out, το σωστό closeout ορίζει την άμυνα: sprint–χαμήλωσε–choppy βήματα, χέρι ψηλά στο σουτ χωρίς φάουλ, και contain του drive προς τη βοήθεια. Το πιο συχνό αμυντικό skill.",
  customPositions:[{r:"SG",x:50,y:70},{r:"PG",x:24,y:58},{r:"SF",x:60,y:44},{r:"PF",x:50,y:80},{r:"C",x:70,y:82}],
  phases:{
    offense:["Ο βοηθός (SG) τρέχει closeout στον σουτέρ μετά το kick-out.","Sprint στα 3/4, μετά short choppy βήματα.","Χέρι ψηλά στο σουτ (contest), όχι φάουλ.","Contain το drive — σπρώξ' τον προς τη βοήθεια."],
    defense:["Vs shot-fake → μείνε κάτω (stay down).","Vs drive → contain & η επόμενη βοήθεια."],
    transition:[],
    special:["Χαμηλός & ισορροπημένος στο closeout.","Μη πηδάς — απλωμένο χέρι.","Οδήγησέ τον στη μη-δυνατή πλευρά."]
  },
  movements:[{from:[50,70],to:[78,58],type:"run"}]
},

/* -- Έναρξη πίεσης (επιπλέον) -- */
{ id:"play-press-sideline", cat:"press", name:"🕸️ Έναρξη: Sideline Trap (3/4)", coach:"Έναρξη πίεσης", full:true, pos:["SG","SF","PF"],
  team:"3/4-court trap", system:"2-2-1 Press (Full)", emoji:"🕸️", intensity:"—", kind:"play",
  summary:"Παγίδα πλάγιας γραμμής: αφήνεις τον αντίπαλο να περάσει τη μπάλα και μόλις πλησιάσει την πλάγια, δύο αμυντικοί τον παγιδεύουν με «τοίχους» την πλάγια & τη μεσαία γραμμή. Χαμηλού ρίσκου, κουραστική.",
  customPositions:[{r:"PG",x:40,y:80},{r:"SG",x:64,y:82},{r:"SF",x:30,y:60},{r:"PF",x:70,y:60},{r:"C",x:50,y:40}],
  phases:{
    offense:["Άφησε την επαναφορά, «οδήγησε» τη μπάλα σε μία πλάγια.","Μόλις πλησιάσει την πλάγια → trap (2 αμυντικοί).","«Τοίχοι»: πλάγια γραμμή + μεσαία γραμμή.","Ο κοντινός διαβάζει την πάσα διαφυγής (κλέψιμο)."],
    defense:["Vs middle → μη το επιτρέψεις (force sideline).","Vs σπάσιμο → οργανωμένη πτώση."],
    transition:["Κλέψιμο → άμεση αντεπίθεση."],
    special:["Trap μόνο κοντά στη γραμμή (παγίδα).","Ενεργά χέρια στις γραμμές πάσας.","Πειθαρχία — force & κράτα."]
  },
  movements:[{from:[64,82],to:[74,78],type:"run"},{from:[70,60],to:[74,72],type:"run"},{from:[40,80],to:[56,80],type:"run"}]
},

/* ===== ΕΠΙΠΛΕΟΝ (Chicago / Flex vs Zone / Press-breaks) ===== */
{ id:"play-chicago", cat:"buildup", name:"⬆️ Chicago Action — Pindown + DHO", coach:"Έναρξη επίθεσης", pos:["SG","SF","C"],
  team:"Entry action", system:"Chicago", emoji:"⬆️", intensity:"—", kind:"play",
  summary:"Δημοφιλής «Chicago» action: ο σκόρερ δέχεται pindown μπλόκο και ρέει κατευθείαν σε dribble hand-off από τον ψηλό, μπαίνοντας σε PnR με φόρα. Δύο μπλόκα στη σειρά — καθαρό σουτ, drive ή pick & roll.",
  customPositions:[{r:"C",x:50,y:52},{r:"SG",x:30,y:84},{r:"PF",x:34,y:68},{r:"PG",x:80,y:44},{r:"SF",x:90,y:80}],
  phases:{
    offense:["Ο PF βάζει pindown στον SG (χαμηλά).","Ο SG ανεβαίνει & δέχεται DHO από τον C (Chicago).","Ο C γυρνά σε ballscreen — άμεσο PnR.","Reads: σουτ, drive, roll ή kick."],
    defense:["Vs top-lock → back-cut στο καλάθι.","Vs switch → attack mismatch."],
    transition:["Ο PG στην κορυφή κρατά ισορροπία."],
    special:["Δύο σκληρά μπλόκα στη σειρά — ρυθμός.","Ο SG «σετάρει» πριν το handoff.","Χαμηλό κέντρο βάρους στην παραλαβή."]
  },
  movements:[{from:[34,68],to:[34,80],type:"screen"},{from:[30,84],to:[46,54],type:"run"},{from:[50,52],to:[46,54],type:"pass"},{from:[50,52],to:[52,66],type:"screen"}]
},
{ id:"play-flex-zone", cat:"team", name:"🏀 Flex vs Zone — Cut στα Κενά", coach:"Επίθεση κατά ζώνης", pos:["PG","SG","SF","PF","C"],
  team:"Vs 2-3 zone", system:"Flex vs Zone", emoji:"🏀", intensity:"—", kind:"play",
  summary:"Προσαρμογή του flex κόντρα σε ζώνη 2-3: αντί για μπλόκα σε συγκεκριμένους αμυντικούς, ο κόφτης «διαβάζει» τα κενά (gaps) και κόβει στο short corner/μέση, ενώ γίνεται αντιστροφή για να κουνηθεί η ζώνη.",
  customPositions:[{r:"PG",x:50,y:36},{r:"SG",x:84,y:52},{r:"SF",x:12,y:84},{r:"PF",x:40,y:86},{r:"C",x:62,y:60}],
  phases:{
    offense:["Αντιστροφή (skip) για να «κουνήσεις» τη ζώνη.","Flex cut στο ballside short corner (κενό της ζώνης).","Ο ψηλός κρατά το high post (τραβά τον μεσαίο).","Reads: layup, short-corner σουτ ή kick-out γωνίας."],
    defense:["Vs κλείσιμο ρακέτας → kick-out & skip.","Μπες στα gaps, όχι πάνω σε αμυντικό."],
    transition:["Επιθετικό ριμπάουντ (η ζώνη κάνει κακό box-out)."],
    special:["Γρήγορη μπάλα > μετακίνηση ζώνης.","Ο κόφτης «διαβάζει» τα κενά.","Υπομονή στην αντιστροφή."]
  },
  movements:[{from:[50,36],to:[84,52],type:"pass"},{from:[12,84],to:[62,84],type:"run"},{from:[62,60],to:[50,60],type:"run"},{from:[84,52],to:[16,56],type:"pass"}]
},
{ id:"play-pressbreak-221", cat:"buildup", name:"⬆️ Press Break vs 2-2-1", coach:"Έναρξη επίθεσης", full:true, pos:["PG","SG","SF","C"],
  team:"Vs 2-2-1 press", system:"Press Break", emoji:"⬆️", intensity:"—", kind:"play",
  summary:"Σπάσιμο της πίεσης 2-2-1: το «κλειδί» είναι η ΜΕΣΗ του γηπέδου, που η 2-2-1 αφήνει ανοιχτή. Φλασάρεις παίκτη στη μέση, τον βρίσκεις με πάσα, γυρίζει μέτωπο και επιτίθεται τον μοναδικό πίσω αμυντικό 2v1.",
  customPositions:[{r:"PG",x:50,y:8},{r:"SG",x:24,y:20},{r:"SF",x:76,y:20},{r:"PF",x:50,y:40},{r:"C",x:50,y:66}],
  phases:{
    offense:["Ασφαλής επαναφορά σε γκαρντ στην πλάγια.","Ο PF φλασάρει στη ΜΕΣΗ (η 2-2-1 την αφήνει).","Πάσα στη μέση — γυρίζει μέτωπο μπροστά.","Επίθεση στον μοναδικό «5» (safety) 2v1 με τον C που τρέχει."],
    defense:["Vs trap πλάγιας → πάσα στη μέση (όχι ντρίμπλα στο trap).","Vs κλείσιμο μέσης → reversal & ξανά."],
    transition:["Μέση → 2v1 μπροστά → εύκολο καλάθι."],
    special:["Ποτέ ντρίμπλα μέσα στο trap.","Κράτα έναν παίκτη πάντα στη μέση.","Ο ψηλός τρέχει το γήπεδο (rim run)."]
  },
  movements:[{from:[50,8],to:[24,20],type:"pass"},{from:[50,40],to:[42,28],type:"run"},{from:[24,20],to:[42,30],type:"pass"},{from:[50,66],to:[50,88],type:"run"}]
},
{ id:"play-pressbreak-131", cat:"buildup", name:"⬆️ Press Break vs 1-3-1", coach:"Έναρξη επίθεσης", full:true, pos:["PG","SG","SF","PF","C"],
  team:"Vs 1-3-1 press", system:"Press Break", emoji:"⬆️", intensity:"—", kind:"play",
  summary:"Σπάσιμο της πίεσης 1-3-1: η 1-3-1 παγιδεύει την πλάγια & την πρώτη πάσα. Αποφεύγεις τη γωνία-παγίδα, βρίσκεις τη μέση/αντιστροφή, και προχωράς πίσω από τον μπροστινό αμυντικό με γρήγορη μπάλα.",
  customPositions:[{r:"PG",x:50,y:8},{r:"SG",x:22,y:22},{r:"PF",x:50,y:32},{r:"SF",x:78,y:22},{r:"C",x:50,y:60}],
  phases:{
    offense:["Επαναφορά ΟΧΙ βαθιά στη γωνία (εκεί είναι η παγίδα).","Ο PF έρχεται στη μέση ως «relief» (πίσω από τον μπροστινό).","Πάσα στη μέση → γρήγορη αντιστροφή στην αδύναμη πλευρά.","Προχώρα πίσω από τον top αμυντικό με γρήγορη μπάλα."],
    defense:["Vs trap γωνίας → μη μπεις· παίξε τη μέση.","Vs κλείσιμο μέσης → reversal & attack."],
    transition:["Πέρασμα → αριθμητικό πλεονέκτημα μπροστά."],
    special:["Απόφυγε τη «νεκρή» γωνία.","Γρήγορη αντιστροφή — η 1-3-1 αργεί να γυρίσει.","Ψυχραιμία, όχι σηκωμένη μπάλα."]
  },
  movements:[{from:[50,8],to:[22,22],type:"pass"},{from:[50,32],to:[38,26],type:"run"},{from:[22,22],to:[40,28],type:"pass"},{from:[50,60],to:[50,86],type:"run"}]
},

/* ===== ΕΠΙΠΛΕΟΝ: Floppy vs Zone / Zoom counters / Quick-hitters ===== */
{ id:"play-floppy-zone", cat:"team", name:"🏀 Floppy vs Zone — Γέμισμα Κενού", coach:"Επίθεση κατά ζώνης", pos:["SG","C","PF"],
  team:"Vs 2-3 zone", system:"Floppy Zone", emoji:"🏀", intensity:"—", kind:"play",
  summary:"Το floppy προσαρμοσμένο κόντρα σε ζώνη: ο σουτέρ δεν κυνηγά αμυντικό αλλά «γεμίζει» το κενό (gap) όπου φτάνει, ενώ ο ψηλός φλασάρει στο high post για να κρατήσει τον μεσαίο. Καθαρό σουτ από seam.",
  customPositions:[{r:"PG",x:50,y:34},{r:"SG",x:50,y:90},{r:"C",x:40,y:62},{r:"PF",x:62,y:70},{r:"SF",x:64,y:80}],
  phases:{
    offense:["Ο SG ξεκινά κάτω· διαβάζει την πλευρά με το κενό.","Βγαίνει στο seam (γωνία/πτέρυγα) όχι πάνω σε αμυντικό.","Ο C φλασάρει στο high post (κρατά τον μεσαίο).","Πάσα στο κενό — σουτ ή kick αν αναδιπλωθεί η ζώνη."],
    defense:["Vs shift → skip στην αδύναμη πλευρά.","Vs κλείσιμο → high-low στον C."],
    transition:["Επιθετικό ριμπάουντ (η ζώνη κάνει κακό box-out)."],
    special:["Μπες στο κενό, όχι στον αμυντικό.","Γρήγορη μπάλα > η ζώνη.","Πόδια έτοιμα για σουτ."]
  },
  movements:[{from:[40,62],to:[34,66],type:"screen"},{from:[50,90],to:[16,80],type:"run"},{from:[50,34],to:[16,80],type:"pass"},{from:[62,70],to:[50,60],type:"run"}]
},
{ id:"play-zoom-counter", cat:"off2", name:"🤝 Zoom + Counters (vs Switch)", coach:"Συνεργασία 2 παικτών", pos:["SG","C"],
  team:"2-man game", system:"Zoom Counter", emoji:"🤝", intensity:"—", kind:"play",
  summary:"Το Zoom (pindown + DHO) με τις απαντήσεις του όταν η άμυνα αντιδρά: vs switch → reject/slip· vs top-lock → back-cut· vs blitz → short-roll 4v3. Μάθε τα counters, όχι μόνο τη δράση.",
  customPositions:[{r:"C",x:50,y:56},{r:"SG",x:30,y:84},{r:"PF",x:34,y:68},{r:"PG",x:80,y:44},{r:"SF",x:90,y:80}],
  phases:{
    offense:["Βασικό: pindown (PF) → DHO από τον C → PnR.","Vs SWITCH: reject το handoff & επίθεση στο mismatch, ή ο C slip στο καλάθι.","Vs TOP-LOCK (deny): άμεσο back-cut στο καλάθι.","Vs BLITZ: short-roll του C — παίξε 4v3."],
    defense:["Διάβασε την αντίδραση ΠΡΙΝ την επαφή.","Μία απόφαση, γρήγορα (0.5)."],
    transition:["Ο PG κρατά ισορροπία στην κορυφή."],
    special:["Ρυθμός στα δύο μπλόκα.","Ο σουτέρ «σετάρει» πριν το handoff.","Κάθε coverage έχει έτοιμη απάντηση."]
  },
  movements:[{from:[34,68],to:[34,80],type:"screen"},{from:[30,84],to:[46,54],type:"run"},{from:[50,56],to:[46,54],type:"pass"},{from:[50,56],to:[54,74],type:"run"}]
},
{ id:"play-ato-quick", cat:"setplay", name:"📋 ATO: Quick Hitter — Last Shot", coach:"Στημένη Φάση (ATO)", pos:["SG","PG","PF"],
  team:"After Timeout · late clock", system:"Quick Hitter", emoji:"📋", intensity:"—", kind:"play",
  summary:"Γρήγορη στημένη για την τελευταία επίθεση: δίνεις τη μπάλα στον κορυφαίο σκόρερ με ballscreen στην πτέρυγα και μέγιστο spacing (4-out), ώστε να επιτεθεί καθαρά για το νικητήριο σουτ (2 ή 3).",
  customPositions:[{r:"PG",x:50,y:34},{r:"SG",x:88,y:54},{r:"PF",x:60,y:60},{r:"C",x:50,y:88},{r:"SF",x:10,y:82}],
  phases:{
    offense:["Πάσα στον κορυφαίο σκόρερ (SG) στην πτέρυγα.","Ο PF βάζει ballscreen — spacing 4-out.","Ο SG επιτίθεται για το τελευταίο σουτ.","Reads: switch → mismatch· drop → pull-up· help → kick."],
    defense:["Χρόνος: αρκετός για μία ενέργεια, όχι δύο.","Vs foul-to-give → ψεύτικη κίνηση & ξανά."],
    transition:["Ισορροπία για offensive rebound (tip-in)."],
    special:["Δώσ' την στον καλύτερο.","Καθαρό spacing — καμία βοήθεια κοντά.","Χρονισμός: σουτ στα 2''-3'' (rebound)."]
  },
  movements:[{from:[50,34],to:[86,54],type:"pass"},{from:[60,60],to:[80,54],type:"screen"},{from:[88,54],to:[70,80],type:"run"}]
},
{ id:"play-ato-late", cat:"setplay", name:"📋 ATO: Late-Clock — Empty-Side PnR", coach:"Στημένη Φάση (ATO)", pos:["SG","C"],
  team:"After Timeout · late clock", system:"Empty-Side PnR", emoji:"📋", intensity:"—", kind:"play",
  summary:"Στημένη λήξης χρόνου: «άδειασμα» της μιας πλευράς (empty corner) και pick & roll για τον σκόρερ χωρίς βοήθεια από τη γωνία. Διαβάζει το switch και τιμωρεί το mismatch ή το drop.",
  customPositions:[{r:"PG",x:50,y:36},{r:"SG",x:84,y:52},{r:"SF",x:10,y:82},{r:"PF",x:90,y:82},{r:"C",x:58,y:50}],
  phases:{
    offense:["Πάσα στον σκόρερ (SG)· άδειασε τη γωνία της πλευράς του.","Ο C βάζει ballscreen από την «άδεια» πλευρά.","Ο SG επιτίθεται χωρίς βοήθεια από τη γωνία.","Reads: switch → mismatch· drop → pull-up· roll → lob."],
    defense:["Empty corner = καμία βοήθεια στο drive.","Vs blitz → short-roll 4v3."],
    transition:["Οι σουτέρ έτοιμοι για kick-out."],
    special:["Ξεκάθαρο άδειασμα πλευράς.","Ο σκόρερ διαβάζει & αποφασίζει.","Ιδανικό για go-to παίκτη στα κρίσιμα."]
  },
  movements:[{from:[50,36],to:[84,52],type:"pass"},{from:[58,50],to:[78,50],type:"screen"},{from:[84,52],to:[66,78],type:"run"}]
},
{ id:"play-blob-winner", cat:"setplay", name:"📋 BLOB: Buzzer-Beater (2 ή 3)", coach:"Στημένη Φάση (BLOB)", pos:["SF","SG","C"],
  team:"Baseline Out of Bounds · last second", system:"BLOB Winner", emoji:"📋", intensity:"—", kind:"play",
  summary:"Επαναφορά τελευταίου δευτερολέπτου με δύο επιλογές: γρήγορο τρίποντο στην κορυφή για τη νίκη (αν χάνεις), ή slip στο καλάθι για layup (αν θες 2). Ο inbounder διαβάζει την άμυνα & εκτελεί.",
  customPositions:[{r:"PG",x:50,y:99},{r:"SG",x:30,y:80},{r:"SF",x:70,y:80},{r:"PF",x:40,y:90},{r:"C",x:60,y:90}],
  phases:{
    offense:["Ο PG (inbounder) εκτός γραμμής, μετρά «5».","Επιλογή Α (για 3): stagger για τον SF στην κορυφή → τρίποντο.","Επιλογή Β (για 2): ο SG «γλιστρά» (slip) στο καλάθι για layup.","Ο inbounder διαβάζει ποια είναι ανοιχτή & πασάρει."],
    defense:["Vs top-lock στον σουτέρ → slip για 2.","Vs switch → mismatch στο καλάθι."],
    transition:["Ένας πίσω για ασφάλεια (μη δεχτείς αντεπίθεση)."],
    special:["Ξεκάθαρη προτεραιότητα ανάλογα με το σκορ (2 ή 3).","Timing: αρκετός χρόνος μόνο για σουτ.","Δυνατά, νόμιμα μπλόκα."]
  },
  movements:[{from:[40,90],to:[48,84],type:"screen"},{from:[70,80],to:[50,60],type:"run"},{from:[50,99],to:[50,60],type:"pass"},{from:[30,80],to:[46,94],type:"run"}]
},

/* ===== ΕΠΙΠΛΕΟΝ: SLOB Winner & Αμυντικά sets κατά BLOB/SLOB αντιπάλου ===== */
{ id:"play-slob-winner", cat:"setplay", name:"📋 SLOB: Winner — Τελευταίο Σουτ", coach:"Στημένη Φάση (SLOB)", pos:["SG","C"],
  team:"Sideline Out of Bounds · last second", system:"SLOB Winner", emoji:"📋", intensity:"—", kind:"play",
  summary:"Επαναφορά πλάγιας τελευταίου δευτερολέπτου: ο σουτέρ βγαίνει πάνω από μπλόκο του ψηλού για γρήγορο catch & shoot, με δεύτερη επιλογή το slip του screener στο καλάθι για layup. Ασφαλής & εκτελέσιμη λύση.",
  customPositions:[{r:"PG",x:96,y:58},{r:"SG",x:40,y:80},{r:"C",x:58,y:72},{r:"SF",x:18,y:56},{r:"PF",x:76,y:86}],
  phases:{
    offense:["Ο PG (inbounder) στην πλάγια, μετρά «5».","Ο C βάζει μπλόκο· ο SG βγαίνει για catch & shoot.","Πρώτη επιλογή: πάσα στον σουτέρ για το σουτ.","Δεύτερη: ο C «γλιστρά» (slip) στο καλάθι για layup."],
    defense:["Vs top-lock → back-cut/slip για 2.","Vs switch → mismatch στο καλάθι."],
    transition:["Ένας πίσω για ασφάλεια (όχι αντεπίθεση)."],
    special:["Προτεραιότητα ανάλογα με σκορ (2 ή 3).","Timing: αρκετός χρόνος για μία ενέργεια.","Δυνατό, νόμιμο μπλόκο."]
  },
  movements:[{from:[58,72],to:[50,74],type:"screen"},{from:[40,80],to:[54,60],type:"run"},{from:[96,58],to:[54,60],type:"pass"},{from:[58,72],to:[54,86],type:"run"}]
},
{ id:"play-def-blob", cat:"def", name:"🛡️ Άμυνα σε BLOB Αντιπάλου", coach:"Αμυντική συνεργασία", pos:["PG","SG","SF","PF","C"], ball:{x:50,y:99},
  team:"Team defense", system:"BLOB Defense", emoji:"🛡️", intensity:"—", kind:"play",
  summary:"Πώς αμύνεσαι την επαναφορά του αντιπάλου από τη γραμμή τέρματος (BLOB): ψηλός στην μπάλα για να ενοχλεί τον πασέρ, match-up σωμάτων, top-lock στον σουτέρ, προστασία ρακέτας και switch σε όλα τα μπλόκα.",
  customPositions:[{r:"C",x:50,y:90},{r:"PF",x:44,y:82},{r:"SG",x:38,y:74},{r:"SF",x:60,y:74},{r:"PG",x:50,y:66}],
  phases:{
    offense:["Βάλε ψηλό στην μπάλα (χέρια ψηλά) — ενόχλησε τον πασέρ.","Match-up: βρες σώμα, μη χαθεί κανείς.","Top-lock τον κύριο σουτέρ (κόψε την πρώτη επιλογή).","Προστασία ρακέτας — καμία εύκολη είσοδος στο καλάθι."],
    defense:["Switch όλα τα μπλόκα (μη «κολλήσεις»).","Vs slip → ο κοντινός καλύπτει· φωνή."],
    transition:["Μετά την ανάκτηση → σβήσε την αντεπίθεση."],
    special:["Επικοινωνία (φωνές) σε κάθε μπλόκο.","Μάτια σε μπάλα & αντίπαλο.","Box-out στη λήξη 5''."]
  },
  movements:[{from:[50,90],to:[50,95],type:"run"},{from:[38,74],to:[44,80],type:"run"},{from:[60,74],to:[54,80],type:"run"}]
},
{ id:"play-def-slob", cat:"def", name:"🛡️ Άμυνα σε SLOB Αντιπάλου", coach:"Αμυντική συνεργασία", pos:["PG","SG","SF","PF","C"], ball:{x:98,y:58},
  team:"Team defense", system:"SLOB Defense", emoji:"🛡️", intensity:"—", kind:"play",
  summary:"Άμυνα στην επαναφορά πλάγιας του αντιπάλου (SLOB): πίεση στον πασέρ, deny της πρώτης εύκολης επιλογής, καμία κοπή στο καλάθι, switch στα μπλόκα — ανάγκασέ τον σε μακρινή/προς τα πίσω πάσα.",
  customPositions:[{r:"SG",x:90,y:58},{r:"PG",x:62,y:62},{r:"SF",x:40,y:66},{r:"PF",x:56,y:80},{r:"C",x:50,y:86}],
  phases:{
    offense:["Πίεση στον inbounder (SG) — δυσκόλεψε την πάσα.","Deny την πρώτη, εύκολη λύση (κοντινός δέκτης).","Καμία κοπή στο καλάθι — «κλείσε» τη ρακέτα.","Ανάγκασέ τον σε μακρινή ή προς τα πίσω πάσα."],
    defense:["Switch τα μπλόκα, μη δώσεις καθαρή γραμμή.","Vs back-cut → ο help καλύπτει, recover."],
    transition:["Μετά το stop → οργανωμένη επιστροφή."],
    special:["Ενεργά χέρια στις γραμμές πάσας.","Επικοινωνία & jump-to-ball.","Πάρε χρόνο από το ρολόι (5'')."]
  },
  movements:[{from:[90,58],to:[92,58],type:"run"},{from:[62,62],to:[70,62],type:"run"},{from:[40,66],to:[48,70],type:"run"}]
}
];

/* ---------- Βιβλιοθήκη Ασκήσεων Προπόνησης ---------- */
const DRILLS_SEED = [
{ id:"shell-4v4", name:"Shell Drill 4v4 (Αμυντικές Αρχές)", cat:"Άμυνα / Οργάνωση", dur:20, players:"8+",
  intensity:"Μεσαία", tags:["Άμυνα","Βοήθειες","Rotations"],
  goal:"Θεμελίωση αμυντικής θέσης: on-ball pressure, deny, help & recover, jump to the ball.",
  setup:"4 επιθετικοί περιμετρικά, 4 αμυντικοί. Χωρίς σκοράρισμα αρχικά — μόνο κυκλοφορία μπάλας & σωστή αμυντική τοποθέτηση (ball–you–man). Πρόσθεσε drive & closeout σταδιακά.",
  coaching:["Θέση: μπάλα–εγώ–αντίπαλος","Pistols/χέρια στη γραμμή πάσας","Jump to the ball σε κάθε πάσα","Closeout με χέρια ψηλά, χαμηλός"],
  progression:"→ live 4v4 με σκορ · → πρόσθεσε PnR coverage · → 5v5 shell" },
{ id:"3man-weave", name:"3-Man Weave + Τελείωμα", cat:"Μετάβαση / Τεχνική", dur:12, players:"6+",
  intensity:"Μεσαία", tags:["Πάσα","Μετάβαση","Layups"],
  goal:"Πάσα εν κινήσει, γέμισμα διαδρόμων, τελείωμα σε ρυθμό fast break.",
  setup:"Τρεις παίκτες τρέχουν το μήκος περνώντας & κόβοντας πίσω από την πάσα (weave), τελειώνουν με layup/τρίποντο. Επιστροφή 2v1.",
  coaching:["Πάσα & κόψε πίσω από τη μπάλα","Κράτα φαρδιά τους διαδρόμους","Ταχύτητα υπό έλεγχο","Καθαρό τελείωμα και στα δύο χέρια"],
  progression:"→ 3v2 στην επιστροφή · → 4-man / 5-man weave" },
{ id:"5out-react", name:"5-Out Motion (Read & React)", cat:"Επίθεση / Motion", dur:22, players:"10+",
  intensity:"Υψηλή", tags:["Motion","Spacing","Reads"],
  goal:"Αυτοματισμοί motion: pass & cut, drive & kick, fill, back-cut στο overplay.",
  setup:"5v0 → 5v5. Πέντε έξω από τη γραμμή, spacing 4.5μ. Κανόνες: μετά την πάσα κόβεις (basket cut), ο επόμενος γεμίζει (fill). Στο overplay → back-cut.",
  coaching:["Κράτα το spacing (4.5μ)","Pass & cut με ένταση","Drive μόνο σε κλειστή άμυνα → kick","Κανόνας 0.5: πάσα/σουτ/ντρίμπλα"],
  progression:"→ με παθητική άμυνα · → live 5v5 · → πρόσθεσε ψηλό (4-out 1-in)" },
{ id:"pnr-reads", name:"Pick & Roll Reads 2v2 / 3v3", cat:"Επίθεση / PnR", dur:20, players:"6+",
  intensity:"Υψηλή", tags:["Pick & Roll","Reads","Screens"],
  goal:"Ανάγνωση coverage στο pick & roll: drop, switch, hedge, blitz — σωστή απόφαση.",
  setup:"2v2 στην κορυφή με screener. Ο αμυντικός δείχνει διαφορετικό coverage κάθε φορά· ο χειριστής διαβάζει: reject, split, roll, pop, pocket pass, skip.",
  coaching:["Ρώτα: πού είναι ο μεγάλος; (drop/hedge)","Χρησιμοποίησε το μπλόκο (κολλητά)","Roll vs pop ανάλογα με τον ψηλό","Skip στη γωνία αν βοηθήσουν"],
  progression:"→ 3v3 με weak-side σουτέρ · → 4v4 με tag the roller · → live" },
{ id:"closeout", name:"Closeout & Contest", cat:"Άμυνα / Ατομική", dur:12, players:"4+",
  intensity:"Μεσαία", tags:["Άμυνα","Closeout","Contest"],
  goal:"Σωστό closeout (χαμηλός, χέρια ψηλά, choppy βήματα) και contest χωρίς φάουλ.",
  setup:"Ο αμυντικός κάτω από το καλάθι, πασάρει έξω & τρέχει closeout στον σουτέρ. Ο επιθετικός: σουτ ή drive. Contest ή stay-down στο shot fake.",
  coaching:["Sprint–χαμήλωσε–choppy βήματα","Χέρι ψηλά στο σουτ, όχι φάουλ","Μην πηδάς στο shot fake","Push τον σουτέρ στη μη-δυνατή πλευρά"],
  progression:"→ closeout + drive contain · → 2v2 rotation closeout" },
{ id:"shooting-spots", name:"Catch & Shoot — 5 Σημεία", cat:"Τελείωμα / Σουτ", dur:15, players:"2+",
  intensity:"Μεσαία", tags:["Σουτ","Τρίποντο","Ρυθμός"],
  goal:"Ποσοστά σουτ off-the-catch από 5 σημεία (γωνίες, πτέρυγες, κορυφή) σε ρυθμό αγώνα.",
  setup:"Πασέρ/rebounder τροφοδοτεί· ο σουτέρ σουτάρει από 5 σημεία, 5 σουτ ανά σημείο. Κατέγραψε ποσοστά. Πρόσθεσε closeout για πίεση.",
  coaching:["Πόδια έτοιμα πριν την πάσα (hop/1-2)","Ίδια μηχανική κάθε φορά","Follow-through & hold","Game-speed, όχι χαλαρά"],
  progression:"→ off-the-dribble · → off-screen (κίνηση) · → με contest" },
{ id:"transition-3v2", name:"Fast Break 3v2 → 2v1", cat:"Μετάβαση", dur:15, players:"6+",
  intensity:"Υψηλή", tags:["Μετάβαση","Αριθμ. πλεονέκτημα","Απόφαση"],
  goal:"Λήψη σωστής απόφασης σε αριθμητικό πλεονέκτημα (επίθεση & άμυνα).",
  setup:"3 επιθετικοί vs 2 αμυντικοί προς το ένα καλάθι· μετά το σουτ, 2 επιστρέφουν vs 1 στην αντίθετη. Στόχος: γρήγορη, σωστή επιλογή.",
  coaching:["Γέμισε τους διαδρόμους φαρδιά","Ο μεσαίος διαβάζει τους 2 αμυντικούς","Πάσα νωρίς, όχι αργά","Άμυνα: καθυστέρησε, πάρε χρόνο"],
  progression:"→ 4v3 · → 5v4 · → live με transition D" },
{ id:"rebound-boxout", name:"Ριμπάουντ & Box-Out «War»", cat:"Ριμπάουντ / Φυσικό", dur:12, players:"6+",
  intensity:"Υψηλή", tags:["Ριμπάουντ","Box-out","Ένταση"],
  goal:"Νοοτροπία & τεχνική box-out — κάθε άμυνα τελειώνει με αμυντικό ριμπάουντ.",
  setup:"3v3 στη ρακέτα. Στο σουτ, οι αμυντικοί βρίσκουν & «σφραγίζουν» (box-out) τον αντίπαλο πριν πάρουν τη μπάλα. Πόντος μόνο με box-out + ριμπάουντ.",
  coaching:["Βρες σώμα πριν τη μπάλα","Χαμηλός, φαρδιά βάση, αγκώνες","Κράτα την επαφή 1'' και μετά κυνήγα","Δύο χέρια, chin the ball"],
  progression:"→ 4v4 · → επιθετικό ριμπάουντ vs box-out · → live" },
{ id:"zigzag", name:"Zig-Zag — Ball Handling & On-Ball D", cat:"Ατομική / Τεχνική", dur:10, players:"2+",
  intensity:"Μεσαία", tags:["Ντρίμπλα","Άμυνα","Slides"],
  goal:"Έλεγχος μπάλας με αλλαγές κατεύθυνσης + αμυντικά slides χωρίς σταύρωμα ποδιών.",
  setup:"Σε ζιγκ-ζαγκ κατά μήκος του γηπέδου: ο επιθετικός αλλάζει χέρι/κατεύθυνση στη γραμμή, ο αμυντικός κάνει slide & άλλαξε (drop step). Ρόλοι εναλλάξ.",
  coaching:["Χαμηλή ντρίμπλα, προστασία με το σώμα","Αλλαγή χεριού εκρηκτικά","Slides χωρίς σταύρωμα","Χέρια ενεργά, μάτια στο στήθος"],
  progression:"→ live 1v1 από τη γραμμή · → με τελείωμα" },
{ id:"conditioning", name:"Αμυντικά Slides & Conditioning", cat:"Φυσική / Κατάσταση", dur:10, players:"Όλοι",
  intensity:"Υψηλή", tags:["Φυσική","Άμυνα","Αντοχή"],
  goal:"Αμυντική στάση υπό κόπωση + φυσική κατάσταση ειδική για μπάσκετ.",
  setup:"Defensive slides στο πλάτος της ρακέτας, sprints & backpedal, «17s» ή suicides. Έμφαση στη διατήρηση αμυντικής θέσης όταν κουράζεσαι.",
  coaching:["Κράτα χαμηλό κέντρο βάρους","Καθαρή τεχνική & όταν κουράζεσαι","Ενεργά χέρια πάντα","Ολοκλήρωσε δυνατά (finish)"],
  progression:"Σύνδεσε με shooting (κόπωση) ή τελείωμα" },
{ id:"horns-set", name:"Horns Set — Εκτέλεση Στημένης", cat:"Επίθεση / Στημένες", dur:18, players:"10+",
  intensity:"Μεσαία", tags:["Στημένες","Horns","Patterns"], src:"Βασισμένο σε δημόσια playbooks (Horns actions — NBA/Euroleague)",
  goal:"Απομνημόνευση των αυτοματισμών Horns: PnR, pop, roll, back-screen (horns flare / horns down).",
  setup:"1-4 high (δύο ψηλοί στα elbows, δύο σουτέρ στις γωνίες). Εκτέλεση σειρών: Horns PnR, Horns Flare, Horns Down. Αρχικά 5v0, μετά με παθητικούς & live.",
  coaching:["Καθαρά μπλόκα στα elbows","Πρώτη επιλογή: PnR, δεύτερη: pop/roll","Σουτέρ έτοιμοι στις γωνίες","Διάβασε το coverage & εκτέλεσε"],
  progression:"→ με παθητική άμυνα · → live 5v5 · → πρόσθεσε counters" },
{ id:"scrimmage", name:"Ελεγχόμενο 5v5 (Καταστάσεις)", cat:"Παιχνίδι / Κατάσταση", dur:20, players:"10",
  intensity:"Υψηλή", tags:["Παιχνίδι","Εφαρμογή","Ένταση"],
  goal:"Εφαρμογή συστημάτων σε συνθήκες αγώνα, με περιορισμούς που τονίζουν το θέμα της ημέρας.",
  setup:"5v5 μισό ή ολόκληρο γήπεδο με κανόνες: π.χ. «κάθε επίθεση min 3 πάσες», «όχι δίποντο εκτός ρακέτας», «κάθε άμυνα με box-out». Καταστάσεις σκορ/χρόνου.",
  coaching:["Εφάρμοσε το σύστημα, όχι το ένστικτο","Επικοινωνία στην άμυνα (φωνές)","Transition balance πάντα","Εκτέλεσε τα κρίσιμα (clutch)"],
  progression:"→ ειδικές καταστάσεις (last shot, +/- πόντοι, φάουλ)" }
];

/* ---------- Δείγμα Ρόστερ (12άδα) ---------- */
const PLAYERS_SEED = [
  p("Α. Καρράς","PG",27,{σουτ:15,τρίποντο:15,πάσα:17,ντρίμπλα:16,διείσδυση:15,άμυνα:14,IQ:17,ηγεσία:16},
    {height:189, weight:84, pastPositions:["PG","SG"], suitability:{"PG":"good","SG":"ok","SF":"no"}}),
  p("Δ. Στεφάνου","PG",22,{σουτ:14,τρίποντο:14,πάσα:15,ντρίμπλα:16,διείσδυση:16,άμυνα:15,ταχύτητα:16,IQ:14}),
  p("Ν. Βλάχος","SG",29,{σουτ:17,τρίποντο:17,πάσα:12,ντρίμπλα:13,διείσδυση:13,άμυνα:13,κίνηση:16,ψυχραιμία:16},
    {height:196, weight:88, pastPositions:["SG"], suitability:{"SG":"good","SF":"ok","PG":"no"}}),
  p("Γ. Παππάς","SG",24,{σουτ:15,τρίποντο:14,πάσα:13,ντρίμπλα:15,διείσδυση:16,άμυνα:16,αθλητικότητα:16,ταχύτητα:16}),
  p("Μ. Ιωαννίδης","SF",26,{σουτ:14,τρίποντο:15,πάσα:14,ντρίμπλα:14,διείσδυση:15,άμυνα:16,ριμπάουντ:13,αθλητικότητα:16},
    {height:201, weight:96, pastPositions:["SF","SG"], suitability:{"SF":"good","SG":"ok","PF":"ok"}}),
  p("Θ. Κωστόπουλος","SF",23,{σουτ:15,τρίποντο:16,πάσα:13,ντρίμπλα:13,διείσδυση:13,άμυνα:15,ριμπάουντ:13,κίνηση:15}),
  p("Λ. Δημόπουλος","PF",28,{σουτ:14,τρίποντο:15,πάσα:13,διείσδυση:12,άμυνα:15,ριμπάουντ:16,δύναμη:16,IQ:15},
    {height:206, weight:104, pastPositions:["PF","C"], suitability:{"PF":"good","C":"ok","SF":"no"}}),
  p("Β. Αντωνιάδης","PF",21,{σουτ:12,τρίποντο:12,πάσα:11,διείσδυση:13,άμυνα:15,ριμπάουντ:16,δύναμη:16,αθλητικότητα:15}),
  p("Η. Ρούσσος","C",30,{σουτ:12,τρίποντο:9,πάσα:13,άμυνα:16,ριμπάουντ:17,τάπα:16,δύναμη:17,τοποθέτηση:16},
    {height:211, weight:114, pastPositions:["C"], suitability:{"C":"good","PF":"ok"}}),
  p("Σ. Μαυρίδης","C",25,{σουτ:14,τρίποντο:14,πάσα:14,άμυνα:14,ριμπάουντ:15,τάπα:13,δύναμη:14,IQ:15},
    {height:208, weight:106, pastPositions:["C","PF"], suitability:{"C":"good","PF":"good","SF":"no"}}),
  p("Φ. Νικολαΐδης","SG",19,{σουτ:14,τρίποντο:14,πάσα:12,ντρίμπλα:14,διείσδυση:14,άμυνα:13,ταχύτητα:15,ψυχραιμία:12}),
  p("Χ. Γαλάνης","PF",20,{σουτ:13,τρίποντο:13,πάσα:12,διείσδυση:13,άμυνα:14,ριμπάουντ:15,δύναμη:15,αθλητικότητα:15})
];

function p(name, pos, age, attrs, extra){
  extra = extra || {};
  // ρεαλιστικά ενδεικτικά ύψος/βάρος ανά θέση (μπάσκετ)
  const H={PG:189,SG:196,SF:201,PF:206,C:211};
  const height = extra.height || (H[pos]||200) + (Math.floor(Math.random()*7)-3);
  const weight = extra.weight || Math.round((height-100)*1.05) + (Math.floor(Math.random()*6)-3);
  return { id:"pl_"+Math.random().toString(36).slice(2,9), name, pos, age, attrs,
    height, weight,
    pastPositions: extra.pastPositions || [pos],
    suitability: extra.suitability || {[pos]:"good"},
    fitness:80+Math.floor(Math.random()*20), morale:70+Math.floor(Math.random()*30),
    minutes:0, points:0, assists:0, rebounds:0, notes:"" };
}

/* Χαρακτηρισμοί καταλληλότητας θέσης */
const SUIT = { good:{t:"Καλά", c:"b"}, ok:{t:"Μέτρια", c:"a"}, no:{t:"Καθόλου", c:"r"} };

/* Κατηγορίες Βιβλιοθήκης Συνεργασιών (Playbook) */
const PLAY_CATS = {
  setplay: {t:"Στημένες Φάσεις (BLOB/SLOB/ATO)", ic:"📋"},
  off2:    {t:"Επίθεση — Συνεργασίες 2 Παικτών", ic:"🤝"},
  off3:    {t:"Επίθεση — Συνεργασίες 3 Παικτών", ic:"👥"},
  team:    {t:"Ομαδική Επίθεση (5 Παίκτες)", ic:"🏀"},
  buildup: {t:"Έναρξη Επίθεσης / Build-up", ic:"⬆️"},
  def:     {t:"Αμυντικές Συνεργασίες (2 & 3)", ic:"🛡️"},
  press:   {t:"Έναρξη Πίεσης (Press)", ic:"🕸️"}
};

/* Κύριες θέσεις-κλειδιά ανά συνεργασία (για φίλτρο θέσης) — για τις seed χωρίς inline pos */
const PLAY_POS = {
  "play-blob-box":["PF","C"], "play-ato-horns":["PG","SF"], "play-slob-zipper":["SG","PG"],
  "play-ato-stagger":["SG"], "play-blob-stack":["PF","C"],
  "play-pnr":["PG","C"], "play-pnpop":["PG","PF"], "play-dho":["SG","C"], "play-giveandgo":["PG","SG"], "play-backscreen":["PG","PF"],
  "play-split":["C","PG","SG"], "play-hammer":["PG","SF"], "play-pistol":["PG","SG","C"], "play-flex":["SF","PF","C"],
  "play-5out":["PG","SG","SF","PF","C"], "play-chin":["PG","C"], "play-flexcont":["PG","SG","SF","PF","C"],
  "play-drag":["PG","C"], "play-zoom":["SG","C"], "play-get":["PG","SG","C"], "play-pressbreak":["PG","SG","SF","PF","C"],
  "play-def-drop":["PG","C"], "play-def-hedge":["PG","C"], "play-def-switch":["PG","C"], "play-def-blitz":["PG","C","PF"], "play-def-ice":["PG","C"], "play-def-tag":["PF","C","SF"],
  "play-press-trap1211":["PG","SG","SF"], "play-press-221":["PG","SG","SF"], "play-press-runjump":["PG","SG","SF"], "play-press-131half":["PG","SG","PF"]
};

/* Καθήκοντα ανά θέση (επίθεση/άμυνα) — αναφορά προπονητή */
const POSITION_DUTIES = {
  PG:{ name:"Playmaker (Point Guard) — «Ο εγκέφαλος»", ic:"🧠",
    off:["Οργανώνει: φέρνει τη μπάλα, στήνει το σύστημα, ελέγχει το τέμπο.","Χειριστής στο pick & roll — διαβάζει το coverage & αποφασίζει.","Drive & kick: διεισδύει και βρίσκει τους σουτέρ.","Φροντίζει το spacing & το «0.5» (γρήγορη απόφαση)."],
    def:["Πίεση στον αντίπαλο πλέι — κατευθύνει τη μπάλα.","Πρώτος στο transition D — σταματά τη μπάλα.","«Nail» help στη διείσδυση, deny στην κορυφή."] },
  SG:{ name:"Shooting Guard (2) — «Ο εκτελεστής»", ic:"🎯",
    off:["Σκοράρει: catch & shoot, off-screen (floppy/stagger), off-dribble.","Κίνηση χωρίς μπάλα — βρίσκει χώρο, γεμίζει γωνίες.","Δεύτερος χειριστής/δημιουργός όταν χρειάζεται.","Spot-up στη γωνία (corner three)."],
    def:["Μαρκάρει τον καλύτερο περιφερειακό σκόρερ.","Παλεύει πάνω από τα off-ball μπλόκα.","Closeout & contest χωρίς φάουλ."] },
  SF:{ name:"Small Forward (3) — «Ο ευέλικτος»", ic:"🃏",
    off:["Σκοράρει από παντού: iso, drive, mid-range, τρίποντο.","Point-forward: χειρίζεται & δημιουργεί από το ψηλό.","Iverson/wing cuts, transition wing.","Επιθετικό ριμπάουντ & δεύτερες ευκαιρίες."],
    def:["Αμύνεται σε πολλές θέσεις (switchable).","Αναλαμβάνει τον αστέρα του αντιπάλου.","Βοηθά στο ριμπάουντ & στα rotations."] },
  PF:{ name:"Power Forward (4) — «Ο ενδιάμεσος»", ic:"💪",
    off:["Screener στο PnR: roll (κάρφωμα/lob) ή pop (τρίποντο).","Stretch 4: ανοίγει τη ρακέτα με το σουτ.","Post-up & duck-in σε mismatch· high-low.","Επιθετικό ριμπάουντ."],
    def:["Άμυνα στη ρακέτα & βοήθεια (tag the roller).","Box-out & αμυντικό ριμπάουντ.","Switch/hedge σε PnR όταν ζητηθεί."] },
  C:{ name:"Center (5) — «Ο πύργος»", ic:"🗼",
    off:["Screener & roll man (lob/finishing) ή stretch/pop.","Post-up, hand-offs (DHO), κόμβος δημιουργίας από το ψηλό.","Duck-in & short corner κατά ζώνης.","Κυριαρχία στο επιθετικό ριμπάουντ."],
    def:["Προστάτης ρακέτας (rim protection, drop coverage).","Ηγέτης αμυντικής επικοινωνίας — «διαβάζει» τη φάση.","Κυριαρχία αμυντικού ριμπάουντ (box-out)."] }
};

/* Ελληνικές ονομασίες φάσεων (μπάσκετ) */
const PHASE_LABELS = {
  offense:{t:"Επίθεση (Half-court)", c:"pt-att"},
  defense:{t:"Άμυνα / Οργάνωση", c:"pt-def"},
  transition:{t:"Μετάβαση / Fast Break", c:"pt-tr"},
  special:{t:"Στημένες & Ριμπάουντ", c:"pt-sp"}
};
