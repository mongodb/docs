// The `frozenCompany` here represents an `@ObservedRealmObject var company: Company`
performAnExplicitWrite(company: frozenCompany, employeeName: "Dachary", dogName: "Maui")

func performAnExplicitWrite(company: Company, employeeName: String, dogName: String) {
    // Get the realm that is managing the `Company` object you passed in.
    // Thaw the realm so you can write to it.
    let realm = company.realm!.thaw()
    // Thawing the `Company` object that you passed in also thaws the objects in its List properties.
    // This lets you append the `Dog` to the `Employee` without individually thawing both of them.
    let thawedCompany = company.thaw()!
    let thisEmployee = thawedCompany.employees.where { $0.name == employeeName }.first!
    let thisDog = thawedCompany.dogs.where { $0.name == dogName }.first!
    try! realm.write {
        thisEmployee.dogs.append(thisDog)
    }
}
