@interface CollectionNotificationExampleViewController : UITableViewController
@end

@implementation CollectionNotificationExampleViewController {
    RLMNotificationToken *_notificationToken;
}
- (void)viewDidLoad {
    [super viewDidLoad];

    // Observe RLMResults Notifications
    __weak typeof(self) weakSelf = self;
    _notificationToken = [[Dog objectsWhere:@"age > 5"]
      addNotificationBlock:^(RLMResults<Dog *> *results, RLMCollectionChange *changes, NSError *error) {
        
        if (error) {
            NSLog(@"Failed to open realm on background worker: %@", error);
            return;
        }

        UITableView *tableView = weakSelf.tableView;
        // Initial run of the query will pass nil for the change information
        if (!changes) {
            [tableView reloadData];
            return;
        }

        // Query results have changed, so apply them to the UITableView
        [tableView performBatchUpdates:^{
            // Always apply updates in the following order: deletions, insertions, then modifications.
            // Handling insertions before deletions may result in unexpected behavior.
            [tableView deleteRowsAtIndexPaths:[changes deletionsInSection:0]
                             withRowAnimation:UITableViewRowAnimationAutomatic];
            [tableView insertRowsAtIndexPaths:[changes insertionsInSection:0]
                             withRowAnimation:UITableViewRowAnimationAutomatic];
            [tableView reloadRowsAtIndexPaths:[changes modificationsInSection:0]
                             withRowAnimation:UITableViewRowAnimationAutomatic];
        } completion:^(BOOL finished) {
            // ...
        }];
    }];
}
@end
