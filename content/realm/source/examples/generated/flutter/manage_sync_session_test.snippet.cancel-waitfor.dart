final cancellationToken = CancellationToken();

final waitForDownloadFuture =
    realm.syncSession.waitForDownload(cancellationToken);
cancellationToken.cancel();

final waitForUploadFuture =
    realm.syncSession.waitForUpload(cancellationToken);
cancellationToken.cancel();
