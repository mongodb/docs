export function ItemListView() {
  const realm = useRealm();
  const items = useQuery(Item).sorted('_id');
  const user = useUser();

  const [showNewItemOverlay, setShowNewItemOverlay] = useState(false);	
  const [showAlertBox, setShowAlertBox] = useState(false);
