// Use Type Predicates and Object.getPropertyType() to
// create a runtime type check for Mixed properties.
const isString = (
  val: Mixed,
  name: string,
  object: Realm.Object,
): val is Realm.Types.String => {
  return object.getPropertyType(name) === 'string';
};

type CatInfoCardProps = {catName: string};

const CatInfoCard = ({catName}: CatInfoCardProps) => {
  const cat = useQuery(
    Cat,
    cats => {
      return cats.filtered(`name = '${catName}'`);
    },
    [catName],
  )[0];
  // Use the type check to handle your data.
  const catBirthDate = isString(cat.birthDate, 'birthDate', cat)
    ? cat.birthDate
    : cat.birthDate.toString();

  if (cat) {
    return (
      <>
        <Text>{catName}</Text>
        <Text>{catBirthDate}</Text>
      </>
    );
  } else {
    return <Text>Cat not found</Text>;
  }
};
