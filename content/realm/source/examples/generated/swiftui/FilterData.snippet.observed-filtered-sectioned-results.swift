@ObservedSectionedResults(Dog.self,
                          sectionKeyPath: \.firstLetter,
                          where: ( { $0.weight > 40 } )) var dogs
