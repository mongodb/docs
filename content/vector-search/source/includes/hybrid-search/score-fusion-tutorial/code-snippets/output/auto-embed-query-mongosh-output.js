[
  {
    _id: ObjectId('573a13a3f29313caabd0d0a8'),
    fullplot: "Dr. John Dolittle the beloved doctor is back, but this time around he plays cupid to bumbling circus bear Archie as he's so smitten by a Pacific Western bear female, Ava. Dr. Dolittle must help a group of forest creatures to save their forest. But with the aid of his mangy, madcap animal friends, Dr. Dolittle must teach Archie the ways of true romance in time to save his species and his home before their habit is gone. So John held a meeting for every animal in the forest to not give up without a fight no matter what kind of animal expression they have and everyone agrees to do it and save their home.",
    title: 'Dr. Dolittle 2',
    scoreDetails: {
      value: 7.2132815008617355,
      description: 'the value calculated by combining the scores (either normalized or raw) across input pipelines from which this document is output from:',
      normalization: 'sigmoid',
      combination: {
        method: 'custom expression',
        expression: "{ string: { $sum: [ { $multiply: [ '$$searchOne', 10 ] }, '$$searchTwo' ] } }"
      },
      details: [
        {
          inputPipelineName: 'searchOne',
          inputPipelineRawScore: 0.5037489533424377,
          weight: 1,
          value: 0.6233399438385476,
          details: []
        },
        {
          inputPipelineName: 'searchTwo',
          inputPipelineRawScore: 3.8858203887939453,
          weight: 1,
          value: 0.97988206247626,
          details: []
        }
      ]
    }
  },
  {
    _id: ObjectId('573a1394f29313caabce074d'),
    title: 'Perri',
    fullplot: 'This True Life Fantasy follows and shows how the life of a female squirrel, Perri, in the forest is filled with danger and fraught with peril. When not fleeing her natural enemy, the Marten, Perri finds time to fall in love with her prince-charming male squirrel.',
    scoreDetails: {
      value: 7.192962235520302,
      description: 'the value calculated by combining the scores (either normalized or raw) across input pipelines from which this document is output from:',
      normalization: 'sigmoid',
      combination: {
        method: 'custom expression',
        expression: "{ string: { $sum: [ { $multiply: [ '$$searchOne', 10 ] }, '$$searchTwo' ] } }"
      },
      details: [
        {
          inputPipelineName: 'searchOne',
          inputPipelineRawScore: 0.5038293600082397,
          weight: 1,
          value: 0.6233588221119238,
          details: []
        },
        {
          inputPipelineName: 'searchTwo',
          inputPipelineRawScore: 3.1618731021881104,
          weight: 1,
          value: 0.9593740144010627,
          details: []
        }
      ]
    }
  },
  {
    _id: ObjectId('573a13abf29313caabd24d08'),
    title: 'The Web of the Witch',
    fullplot: "In a small North Indian village, Legend has it that a 100 years-old witch lives in an abandoned mansion on the village outskirts, and any person who goes inside is turned into an animal. In the same village a clever, naughty girl named Chunni (Shweta Prasad) lives with her widowed father, grandmother and her identical twin Munni, who is just the exact opposite of Chunni in mannerisms. But one day, Chunni's prank causes Munni enters the witch's mansion and the witch turns her into a hen. Chunni strikes a deal with Makdee (Shabana Azmi) that she will present Makdee with 100 hens in exchange for Munni in human form. How she manages this task forms the crux of the rest of this fun-filled children's movie.",
    scoreDetails: {
      value: 7.1420149329447735,
      description: 'the value calculated by combining the scores (either normalized or raw) across input pipelines from which this document is output from:',
      normalization: 'sigmoid',
      combination: {
        method: 'custom expression',
        expression: "{ string: { $sum: [ { $multiply: [ '$$searchOne', 10 ] }, '$$searchTwo' ] } }"
      },
      details: [
        {
          inputPipelineName: 'searchOne',
          inputPipelineRawScore: 0.5033425092697144,
          weight: 1,
          value: 0.6232445111662779,
          details: []
        },
        {
          inputPipelineName: 'searchTwo',
          inputPipelineRawScore: 2.308393716812134,
          weight: 1,
          value: 0.9095698212819944,
          details: []
        }
      ]
    }
  },
  {
    _id: ObjectId('573a13b3f29313caabd3c269'),
    title: 'Princess Raccoon',
    fullplot: "Amechiyo is being hunted by his father for being too beautiful and as he tries to escape he runs into Princess Raccoon, a raccoon in human form. They fall for each other, but humans and raccoons shouldn't mix so the raccoon court causes some trouble. She saves his life, then he saves hers by finding the Frog of Paradise on the Sacred Mountain and so forth, until the tragic finale.",
    scoreDetails: {
      value: 6.234301475369264,
      description: 'the value calculated by combining the scores (either normalized or raw) across input pipelines from which this document is output from:',
      normalization: 'sigmoid',
      combination: {
        method: 'custom expression',
        expression: "{ string: { $sum: [ { $multiply: [ '$$searchOne', 10 ] }, '$$searchTwo' ] } }"
      },
      details: [
        {
          inputPipelineName: 'searchOne',
          inputPipelineRawScore: 0.5041331648826599,
          weight: 1,
          value: 0.6234301475369264,
          details: []
        },
        {
          inputPipelineName: 'searchTwo',
          inputPipelineRawScore: 0,
          weight: 1,
          value: 0
        }
      ]
    }
  },
  {
    _id: ObjectId('573a13b3f29313caabd3ca2a'),
    title: 'Princess Raccoon',
    fullplot: "Amechiyo is being hunted by his father for being too beautiful and as he tries to escape he runs into Princess Raccoon, a raccoon in human form. They fall for each other, but humans and raccoons shouldn't mix so the raccoon court causes some trouble. She saves his life, then he saves hers by finding the Frog of Paradise on the Sacred Mountain and so forth, until the tragic finale.",
    scoreDetails: {
      value: 6.234301475369264,
      description: 'the value calculated by combining the scores (either normalized or raw) across input pipelines from which this document is output from:',
      normalization: 'sigmoid',
      combination: {
        method: 'custom expression',
        expression: "{ string: { $sum: [ { $multiply: [ '$$searchOne', 10 ] }, '$$searchTwo' ] } }"
      },
      details: [
        {
          inputPipelineName: 'searchOne',
          inputPipelineRawScore: 0.5041331648826599,
          weight: 1,
          value: 0.6234301475369264,
          details: []
        },
        {
          inputPipelineName: 'searchTwo',
          inputPipelineRawScore: 0,
          weight: 1,
          value: 0
        }
      ]
    }
  },
  {
    _id: ObjectId('573a13b4f29313caabd4070d'),
    title: 'Paragraph 78',
    fullplot: 'This is a wonderful movie about a group of men frontier the Nashville area who like to make puppets out of real animals',
    scoreDetails: {
      value: 6.234004537484044,
      description: 'the value calculated by combining the scores (either normalized or raw) across input pipelines from which this document is output from:',
      normalization: 'sigmoid',
      combination: {
        method: 'custom expression',
        expression: "{ string: { $sum: [ { $multiply: [ '$$searchOne', 10 ] }, '$$searchTwo' ] } }"
      },
      details: [
        {
          inputPipelineName: 'searchOne',
          inputPipelineRawScore: 0.5040066838264465,
          weight: 1,
          value: 0.6234004537484044,
          details: []
        },
        {
          inputPipelineName: 'searchTwo',
          inputPipelineRawScore: 0,
          weight: 1,
          value: 0
        }
      ]
    }
  },
  {
    _id: ObjectId('573a1397f29313caabce80f6'),
    title: 'Gauche the Cellist',
    fullplot: 'A cellist in a small orchestra receives help from animals to help him practice his music.',
    scoreDetails: {
      value: 6.2339040634711305,
      description: 'the value calculated by combining the scores (either normalized or raw) across input pipelines from which this document is output from:',
      normalization: 'sigmoid',
      combination: {
        method: 'custom expression',
        expression: "{ string: { $sum: [ { $multiply: [ '$$searchOne', 10 ] }, '$$searchTwo' ] } }"
      },
      details: [
        {
          inputPipelineName: 'searchOne',
          inputPipelineRawScore: 0.5039638876914978,
          weight: 1,
          value: 0.6233904063471131,
          details: []
        },
        {
          inputPipelineName: 'searchTwo',
          inputPipelineRawScore: 0,
          weight: 1,
          value: 0
        }
      ]
    }
  },
  {
    _id: ObjectId('573a13a6f29313caabd174a6'),
    title: "Bear's Kiss",
    fullplot: 'A fairy tale-like love story between young circus artist Lola and the bear Misha, who one day transforms into a human.',
    scoreDetails: {
      value: 6.233723963246328,
      description: 'the value calculated by combining the scores (either normalized or raw) across input pipelines from which this document is output from:',
      normalization: 'sigmoid',
      combination: {
        method: 'custom expression',
        expression: "{ string: { $sum: [ { $multiply: [ '$$searchOne', 10 ] }, '$$searchTwo' ] } }"
      },
      details: [
        {
          inputPipelineName: 'searchOne',
          inputPipelineRawScore: 0.5038871765136719,
          weight: 1,
          value: 0.6233723963246328,
          details: []
        },
        {
          inputPipelineName: 'searchTwo',
          inputPipelineRawScore: 0,
          weight: 1,
          value: 0
        }
      ]
    }
  },
  {
    _id: ObjectId('573a13daf29313caabdad539'),
    title: 'Beauty and the Beast',
    fullplot: 'An unexpected romance blooms after the the youngest daughter of a merchant who has fallen on hard times offers herself to the mysterious beast to which her father has become indebted.',
    scoreDetails: {
      value: 6.23371192845556,
      description: 'the value calculated by combining the scores (either normalized or raw) across input pipelines from which this document is output from:',
      normalization: 'sigmoid',
      combination: {
        method: 'custom expression',
        expression: "{ string: { $sum: [ { $multiply: [ '$$searchOne', 10 ] }, '$$searchTwo' ] } }"
      },
      details: [
        {
          inputPipelineName: 'searchOne',
          inputPipelineRawScore: 0.5038820505142212,
          weight: 1,
          value: 0.623371192845556,
          details: []
        },
        {
          inputPipelineName: 'searchTwo',
          inputPipelineRawScore: 0,
          weight: 1,
          value: 0
        }
      ]
    }
  },
  {
    _id: ObjectId('573a1395f29313caabce10b7'),
    title: 'The Shaggy Dog',
    fullplot: 'Through an ancient spell, a boy changes into a sheepdog and back again. It seems to happen at inopportune times and the spell can only be broken by an act of bravery....',
    scoreDetails: {
      value: 6.233675823991921,
      description: 'the value calculated by combining the scores (either normalized or raw) across input pipelines from which this document is output from:',
      normalization: 'sigmoid',
      combination: {
        method: 'custom expression',
        expression: "{ string: { $sum: [ { $multiply: [ '$$searchOne', 10 ] }, '$$searchTwo' ] } }"
      },
      details: [
        {
          inputPipelineName: 'searchOne',
          inputPipelineRawScore: 0.5038666725158691,
          weight: 1,
          value: 0.6233675823991921,
          details: []
        },
        {
          inputPipelineName: 'searchTwo',
          inputPipelineRawScore: 0,
          weight: 1,
          value: 0
        }
      ]
    }
  }
]