function handleSearch(appId) {
  const urlSearch = `https://sgm-web.jd.com/appManage/app/sourceMaps?id=${appId}`;

  fetch(urlSearch).then(r => r.json()).then(result => {
    const next = index => {
      if (index >= result.length) {
        console.log('done');
        return;
      };

      const item = result[index];

      handleDelete(item.id).then(() => {
        next(index + 1);
      });
    };

    next(0);
  });
}

function handleDelete(sourceMapId) {
  return new Promise(resolve => {
    const urlDelete = `https://sgm-web.jd.com/appManage/app/sourceMap?id=${sourceMapId}`;

    fetch(urlDelete, { method: 'DELETE' }).then(r => r.json()).then(result => {
      console.log(`删除 SourceMap ${sourceMapId} ${result ? '成功' : '失败'}`);

      resolve();
    });
  });
}

// {id: 472, name: 'B2B-PC-ShoppingMall'}
// {id: 514, name: 'B2B-PC-MerchantSystem'}
// {id: 500, name: 'B2B-PC-AdminSystem'}
// {id: 601, name: 'home-appliances-buy'}

handleSearch(472);
