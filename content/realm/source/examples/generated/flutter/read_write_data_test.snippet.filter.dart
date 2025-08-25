final team =
    realm.query<Team>('name == \$0', ['Millennium Falcon Crew']).first;
final humanCrewMembers = team.crew.query('name != \$0', ['Chewbacca']);
