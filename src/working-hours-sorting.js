(() => {
  class WorkingHoursSorting {
    constructor() {

    }

    // 替换节点文本
    replaceNodeTextWithSorted(nodeReferenceList, sortedWorkingHoursDataList) {
      nodeReferenceList.forEach((nodeReference, index) => {
        const sortedWorkingHoursData = sortedWorkingHoursDataList[index];

        const { nameNode, percentNode, shouldHoursNode, filledHoursNode } = nodeReference;
        const { name, percent, shouldHours, filledHours } = sortedWorkingHoursData;

        nameNode.innerHTML = name;
        percentNode.innerHTML = percent;
        shouldHoursNode.innerHTML = shouldHours;
        filledHoursNode.innerHTML = filledHours;
      });
    }

    // 获取排序后的工时数据
    getSortedWorkingHoursDataList(workingHoursDataList) {
      const sortedWorkingHoursDataList = [...workingHoursDataList];

      sortedWorkingHoursDataList.sort((a, b) => {
        return parseFloat(b.shouldHours) - parseFloat(a.shouldHours);
      });

      return sortedWorkingHoursDataList;
    }

    // 获取工时数据
    getWorkingHoursDataList(nodeReferenceList) {
      const workingHoursDataList = nodeReferenceList.map(nodeReference => {
        const { nameNode, percentNode, shouldHoursNode, filledHoursNode } = nodeReference;

        const name = nameNode.innerHTML;
        const percent = percentNode.innerHTML;
        const shouldHours = shouldHoursNode.innerHTML;
        const filledHours = filledHoursNode.innerHTML;

        return { name, percent, shouldHours, filledHours };
      });

      return workingHoursDataList;
    }

    // 获取节点引用, 方便后续修改内容
    getNodeReferenceList(rowNodes) {
      const nodeReferenceList = rowNodes.map(rowNode => {
        const nameNode = rowNode.querySelector('td:nth-child(1) span');
        const percentNode = rowNode.querySelector('td:nth-child(2) span');
        const shouldHoursNode = rowNode.querySelector('td:nth-child(3) > div.cell');
        const filledHoursNode = rowNode.querySelector('td:nth-child(4) > div.cell');

        return { nameNode, percentNode, shouldHoursNode, filledHoursNode };
      });

      return nodeReferenceList;
    }

    getRowNodes() {
      const tableNode = document.querySelector('table.el-table__body');
      const rowNodes = tableNode.querySelectorAll('tr.el-table__row');

      return Array.from(rowNodes);
    }

    addClickListener(sortButton) {
      sortButton.addEventListener('click', () => {
        const rowNodes = this.getRowNodes();
        const nodeReferenceList = this.getNodeReferenceList(rowNodes);

        const workingHoursDataList = this.getWorkingHoursDataList(nodeReferenceList);
        const sortedWorkingHoursDataList = this.getSortedWorkingHoursDataList(workingHoursDataList);

        this.replaceNodeTextWithSorted(nodeReferenceList, sortedWorkingHoursDataList);

        sortButton.remove();
      }, { once: true });
    }

    injectSortButton() {
      const sortButton = document.createElement('div');
      sortButton.setAttribute('type', 'button');
      sortButton.classList.add('el-button', 'el-button--primary', 'el-button--small');

      const textSpan = document.createElement('span');
      textSpan.innerHTML = '排序';

      sortButton.append(textSpan);

      const buttonContainer = this.getButtonContainer();
      buttonContainer.append(sortButton);

      return sortButton;
    }

    getButtonContainer() {
      const selector = 'form.el-form.el-form--inline > div:nth-last-child(1) > div.el-form-item__content';
      const buttonContainer = document.querySelector(selector);

      return buttonContainer;
    }

    setup() {
      // 注入排序按钮
      const sortButton = this.injectSortButton();

      // 注册点击事件
      this.addClickListener(sortButton);
    }
  }

  const workingHoursSortingInstance = new WorkingHoursSorting();

  workingHoursSortingInstance.setup();
})();
