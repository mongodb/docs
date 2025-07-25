﻿// insert code goes here
var comets = new [] {
    new Comet {
        Name = "Halley's Comet",
        OfficialName = "1P/Halley",
        OrbitalPeriod = 75,
        Radius = 3.4175,
        Mass = 2.2e14
    },
    new Comet {
        Name = "Wild2",
        OfficialName = "81P/Wild",
        OrbitalPeriod = 6.41,
        Radius = 1.5534,
        Mass = 2.3e13
    },
    new Comet {
        Name = "Comet Hyakutake",
        OfficialName = "C/1996 B2",
        OrbitalPeriod = 17000,
        Radius = 0.77671,
        Mass = 8.8e12
    }
};

coll.InsertMany(comets);
