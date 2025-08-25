using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Realms;
using Xamarin.Forms;

namespace DataBinding
{
    public partial class MainPage : ContentPage
    {
        public Employee Employee123 { get; }
        public IEnumerable<Employee> Employees { get; }
        public IEnumerable<Item> IncompleteItems { get; }

        public MainPage()
        {
            Realm realm = Realm.GetInstance();

            CreateEmployees(realm);


            //:snippet-start:bind-one-cs
            // :uncomment-start:
            // public Employee Employee123 { get; }
            // ...
            // :uncomment-end:
            Employee123 = realm.All<Employee>()
                .FirstOrDefault(e => e.EmployeeId == "123");
            //:snippet-end:
            //:snippet-start:bind-list-cs
            // :uncomment-start:
            // public IEnumerable<Employee> Employees { get; }
            // ...
            // :uncomment-end:
            Employees = realm.All<Employee>();
            //:snippet-end:
            //:snippet-start:bind-embedded-cs
            // :uncomment-start:
            // public Employee Employee123 { get; }
            // ...
            // :uncomment-end:
            IncompleteItems = Employee123.Items
                .AsRealmQueryable()
                .Where(i => i.IsComplete == false);
            //:snippet-end:
            InitializeComponent();

            BindingContext = this;
        }

        private void CreateEmployees(Realm realm)
        {
            if (realm.All<Employee>().FirstOrDefault(e => e.EmployeeId == "123") == null)
            {
                var tempEmp = new Employee()
                {
                    EmployeeId = "123",
                    Name = "Mr. Mann",
                };
                tempEmp.Items.Add(new Item() { Summary = "Do this important thing.", IsComplete = true });
                tempEmp.Items.Add(new Item() { Summary = "This is a less important thing to do.", IsComplete = false });

                realm.Write(() =>
                {
                    realm.Add(tempEmp);
                });
            }
            if (realm.All<Employee>().FirstOrDefault(e => e.EmployeeId == "456") == null)
            {
                var tempEmp = new Employee()
                {
                    EmployeeId = "456",
                    Name = "Ms. Viers",
                };
                tempEmp.Items.Add(new Item() { Summary = "Do this important thing.", IsComplete = true });
                tempEmp.Items.Add(new Item() { Summary = "This is a less important thing to do.", IsComplete = false });

                realm.Write(() =>
                {
                    realm.Add(tempEmp);
                });
            }
            if (realm.All<Employee>().FirstOrDefault(e => e.EmployeeId == "456") == null)
            {
                var tempEmp = new Employee()
                {
                    EmployeeId = "456",
                    Name = "Ms. Viers",
                };
                tempEmp.Items.Add(new Item() { Summary = "Do this important thing.", IsComplete = true });
                tempEmp.Items.Add(new Item() { Summary = "This is a less important thing to do.", IsComplete = false });

                realm.Write(() =>
                {
                    realm.Add(tempEmp);
                });
            }

        }
    }
}

