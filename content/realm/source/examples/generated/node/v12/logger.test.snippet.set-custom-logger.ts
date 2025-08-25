type Log = {
  message: string;
  level: string;
};
let logs: Log[] = [];

Realm.setLogger((level, message) => {
  logs.push({ level, message });
});
