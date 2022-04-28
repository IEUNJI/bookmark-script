class BatchDeleteSourceMap {
  constructor() {
    this.searchBaseUrl = 'https://sgm-web.jd.com/appManage/app/sourceMaps?id=';
    this.deleteBaseUrl = 'https://sgm-web.jd.com/appManage/app/sourceMap?id=';
    this.sourceMapList = [];
  }

  search(appId) {
    console.log(`查询 App ${appId} ...`);
    return fetch(`${this.searchBaseUrl}${appId}`).then(r => r.json()).then(result => {
      this.sourceMapList = result;
    });
  }

  delete() {
    return new Promise((resolve, reject) => {
      const next = index => {
        if (index >= this.sourceMapList.length) {
          console.log('done!');
          resolve();
          return;
        }

        const sourceMapId = this.sourceMapList[index].id;

        this.deleteHandler(sourceMapId).then(() => {
          next(index + 1);
        });
      };

      next(0);
    });
  }

  deleteHandler(sourceMapId) {
    return fetch(`${this.deleteBaseUrl}${sourceMapId}`, { method: 'DELETE' }).then(r => r.json()).then(result => {
      console.log(`删除 SourceMap ${sourceMapId} ${result ? '成功' : '失败'}`);
    });
  }

  async start(appId) {
    await this.search(appId);
    await this.delete();
  }
}

const batchDeleteSourceMapInstance = new BatchDeleteSourceMap();

const appIdList = [472, 514, 500];
batchDeleteSourceMapInstance.start(appIdList[0]);
