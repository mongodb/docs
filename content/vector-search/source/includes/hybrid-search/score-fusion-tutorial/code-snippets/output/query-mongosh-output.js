[
  {
    _id: ObjectId('573a1397f29313caabce68f6'),
    plot: "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a wookiee and two droids to save the universe from the Empire's world-destroying battle-station, while also attempting to rescue Princess Leia from the evil Darth Vader.",
    title: 'Star Wars: Episode IV - A New Hope',
    scoreDetails: {
      value: 7.847857250621068,
      description: 'the value calculated by combining the scores (either normalized or raw) across input pipelines from which this document is output from:',
      normalization: 'sigmoid',
      combination: {
        method: 'custom expression',
        expression: "{ string: { $sum: [ { $multiply: [ '$$searchOne', 10 ] }, '$$searchTwo' ] } }"
      },
      details: [
        {
          inputPipelineName: 'searchOne',
          inputPipelineRawScore: 0.7987099885940552,
          weight: 1,
          value: 0.6896984675751023,
          details: []
        },
        {
          inputPipelineName: 'searchTwo',
          inputPipelineRawScore: 2.9629626274108887,
          weight: 1,
          value: 0.950872574870045,
          details: []
        }
      ]
    }
  },
  {
    _id: ObjectId('573a139af29313caabcf0f5f'),
    plot: 'Two Jedi Knights escape a hostile blockade to find allies and come across a young boy who may bring balance to the Force, but the long dormant Sith resurface to reclaim their old glory.',
    title: 'Star Wars: Episode I - The Phantom Menace',
    scoreDetails: {
      value: 7.801513736063318,
      description: 'the value calculated by combining the scores (either normalized or raw) across input pipelines from which this document is output from:',
      normalization: 'sigmoid',
      combination: {
        method: 'custom expression',
        expression: "{ string: { $sum: [ { $multiply: [ '$$searchOne', 10 ] }, '$$searchTwo' ] } }"
      },
      details: [
        {
          inputPipelineName: 'searchOne',
          inputPipelineRawScore: 0.7771433591842651,
          weight: 1,
          value: 0.6850641161193273,
          details: []
        },
        {
          inputPipelineName: 'searchTwo',
          inputPipelineRawScore: 2.9629626274108887,
          weight: 1,
          value: 0.950872574870045,
          details: []
        }
      ]
    }
  },
  {
    _id: ObjectId('573a1397f29313caabce77d9'),
    plot: 'After the rebels have been brutally overpowered by the Empire on their newly established base, Luke Skywalker takes advanced Jedi training with Master Yoda, while his friends are pursued by Darth Vader as part of his plan to capture Luke.',
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    scoreDetails: {
      value: 7.797042499608402,
      description: 'the value calculated by combining the scores (either normalized or raw) across input pipelines from which this document is output from:',
      normalization: 'sigmoid',
      combination: {
        method: 'custom expression',
        expression: "{ string: { $sum: [ { $multiply: [ '$$searchOne', 10 ] }, '$$searchTwo' ] } }"
      },
      details: [
        {
          inputPipelineName: 'searchOne',
          inputPipelineRawScore: 0.7810181975364685,
          weight: 1,
          value: 0.6858995173201419,
          details: []
        },
        {
          inputPipelineName: 'searchTwo',
          inputPipelineRawScore: 2.7174296379089355,
          weight: 1,
          value: 0.9380473264069833,
          details: []
        }
      ]
    }
  },
  {
    _id: ObjectId('573a13c0f29313caabd62f62'),
    plot: 'Anakin Skywalker and Ahsoka Tano must rescue the kidnapped son of Jabba the Hutt, but political intrigue complicates their mission.',
    title: 'Star Wars: The Clone Wars',
    scoreDetails: {
      value: 7.79454790938817,
      description: 'the value calculated by combining the scores (either normalized or raw) across input pipelines from which this document is output from:',
      normalization: 'sigmoid',
      combination: {
        method: 'custom expression',
        expression: "{ string: { $sum: [ { $multiply: [ '$$searchOne', 10 ] }, '$$searchTwo' ] } }"
      },
      details: [
        {
          inputPipelineName: 'searchOne',
          inputPipelineRawScore: 0.7561323642730713,
          weight: 1,
          value: 0.6805134398691156,
          details: []
        },
        {
          inputPipelineName: 'searchTwo',
          inputPipelineRawScore: 4.537533760070801,
          weight: 1,
          value: 0.989413510697013,
          details: []
        }
      ]
    }
  },
  {
    _id: ObjectId('573a1397f29313caabce8cdb'),
    plot: 'After rescuing Han Solo from the palace of Jabba the Hutt, the rebels attempt to destroy the second Death Star, while Luke struggles to make Vader return from the dark side of the Force.',
    title: 'Star Wars: Episode VI - Return of the Jedi',
    scoreDetails: {
      value: 7.7910863426550625,
      description: 'the value calculated by combining the scores (either normalized or raw) across input pipelines from which this document is output from:',
      normalization: 'sigmoid',
      combination: {
        method: 'custom expression',
        expression: "{ string: { $sum: [ { $multiply: [ '$$searchOne', 10 ] }, '$$searchTwo' ] } }"
      },
      details: [
        {
          inputPipelineName: 'searchOne',
          inputPipelineRawScore: 0.7782549858093262,
          weight: 1,
          value: 0.6853039016248079,
          details: []
        },
        {
          inputPipelineName: 'searchTwo',
          inputPipelineRawScore: 2.7174296379089355,
          weight: 1,
          value: 0.9380473264069833,
          details: []
        }
      ]
    }
  },
  {
    _id: ObjectId('573a139af29313caabcf124d'),
    plot: 'As the Clone Wars near an end, the Sith Lord Darth Sidious steps out of the shadows, at which time Anakin succumbs to his emotions, becoming Darth Vader and putting his relationships with Obi-Wan and Padme at risk.',
    title: 'Star Wars: Episode III - Revenge of the Sith',
    scoreDetails: {
      value: 7.743510743539187,
      description: 'the value calculated by combining the scores (either normalized or raw) across input pipelines from which this document is output from:',
      normalization: 'sigmoid',
      combination: {
        method: 'custom expression',
        expression: "{ string: { $sum: [ { $multiply: [ '$$searchOne', 10 ] }, '$$searchTwo' ] } }"
      },
      details: [
        {
          inputPipelineName: 'searchOne',
          inputPipelineRawScore: 0.756283700466156,
          weight: 1,
          value: 0.6805463417132204,
          details: []
        },
        {
          inputPipelineName: 'searchTwo',
          inputPipelineRawScore: 2.7174296379089355,
          weight: 1,
          value: 0.9380473264069833,
          details: []
        }
      ]
    }
  },
  {
    _id: ObjectId('573a139af29313caabcf1258'),
    plot: 'Ten years after initially meeting, Anakin Skywalker shares a forbidden romance with Padmè, while Obi-Wan investigates an assassination attempt on the Senator and discovers a secret clone army crafted for the Jedi.',
    title: 'Star Wars: Episode II - Attack of the Clones',
    scoreDetails: {
      value: 7.708006822019003,
      description: 'the value calculated by combining the scores (either normalized or raw) across input pipelines from which this document is output from:',
      normalization: 'sigmoid',
      combination: {
        method: 'custom expression',
        expression: "{ string: { $sum: [ { $multiply: [ '$$searchOne', 10 ] }, '$$searchTwo' ] } }"
      },
      details: [
        {
          inputPipelineName: 'searchOne',
          inputPipelineRawScore: 0.7400004267692566,
          weight: 1,
          value: 0.676995949561202,
          details: []
        },
        {
          inputPipelineName: 'searchTwo',
          inputPipelineRawScore: 2.7174296379089355,
          weight: 1,
          value: 0.9380473264069833,
          details: []
        }
      ]
    }
  },
  {
    _id: ObjectId('573a1398f29313caabce9091'),
    plot: "A Duke's son leads desert warriors against the galactic emperor and his father's evil nemesis when they assassinate his father and free their desert world from the emperor's rule.",
    title: 'Dune',
    scoreDetails: {
      value: 6.888556969451009,
      description: 'the value calculated by combining the scores (either normalized or raw) across input pipelines from which this document is output from:',
      normalization: 'sigmoid',
      combination: {
        method: 'custom expression',
        expression: "{ string: { $sum: [ { $multiply: [ '$$searchOne', 10 ] }, '$$searchTwo' ] } }"
      },
      details: [
        {
          inputPipelineName: 'searchOne',
          inputPipelineRawScore: 0.7947750091552734,
          weight: 1,
          value: 0.6888556969451008,
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
    _id: ObjectId('573a1397f29313caabce6f53'),
    plot: 'In this Star Wars take-off, the peaceful planet of Jillucia has been nearly wiped out by the Gavanas, whose leader takes orders from his mother (played a comic actor in drag) rather than ...',
    title: 'Message from Space',
    scoreDetails: {
      value: 6.8813100491486825,
      description: 'the value calculated by combining the scores (either normalized or raw) across input pipelines from which this document is output from:',
      normalization: 'sigmoid',
      combination: {
        method: 'custom expression',
        expression: "{ string: { $sum: [ { $multiply: [ '$$searchOne', 10 ] }, '$$searchTwo' ] } }"
      },
      details: [
        {
          inputPipelineName: 'searchOne',
          inputPipelineRawScore: 0.7913960218429565,
          weight: 1,
          value: 0.6881310049148682,
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
    _id: ObjectId('573a139df29313caabcfa90b'),
    plot: 'In this Star Wars take-off, the peaceful planet of Jillucia has been nearly wiped out by the Gavanas, whose leader takes orders from his mother (played a comic actor in drag) rather than ...',
    title: 'Message from Space',
    scoreDetails: {
      value: 6.8813100491486825,
      description: 'the value calculated by combining the scores (either normalized or raw) across input pipelines from which this document is output from:',
      normalization: 'sigmoid',
      combination: {
        method: 'custom expression',
        expression: "{ string: { $sum: [ { $multiply: [ '$$searchOne', 10 ] }, '$$searchTwo' ] } }"
      },
      details: [
        {
          inputPipelineName: 'searchOne',
          inputPipelineRawScore: 0.7913960218429565,
          weight: 1,
          value: 0.6881310049148682,
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