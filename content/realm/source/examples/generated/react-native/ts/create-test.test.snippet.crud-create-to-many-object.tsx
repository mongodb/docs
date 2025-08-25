const CreateNewCompanyInput = () => {
  const employees = useQuery(Employee);
  const [companyName, setCompanyName] = useState('');
  const realm = useRealm();

  // Create a new Company and connect our list of Employees to it
  const handleCreateCompany = () => {
    realm.write(() => {
      realm.create('Company', {
        _id: COMPANY_ID,
        name: companyName,
        employees: employees,
      });
    });
  };

  return (
    <>
      <TextInput
        onChangeText={setCompanyName}
        value={companyName}
        
      />
      <Button
        onPress={() => handleCreateCompany()}
        title='Add New Company'
      />
    </>
  );
};
