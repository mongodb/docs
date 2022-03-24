# Update all automation agents

```bash
mongocli iam projects list | awk '{if (NR!=1) {print $1}}' | xargs -I % sh -c "echo 'Updating agents for Project %'; mongocli om agents upgrade --projectId %"
```
