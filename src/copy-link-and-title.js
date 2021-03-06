(() => {
  class CopyLinkAndTitle {
    constructor() {
      this.copyButton = null;
    }

    injectCopyButton() {
      const copyButton = document.createElement('a');
      this.copyButton = copyButton;

      copyButton.innerHTML = '复制链接和标题';
      copyButton.style.cursor = 'pointer';

      const buttonContainer = this.getButtonContainer();
      buttonContainer.append(copyButton);
    }

    getButtonContainer() {
      const selector = '#read_tpc > ignore_js_op > table > tbody > tr > td > span';
      const buttonContainer = document.querySelector(selector);

      buttonContainer.innerHTML = '';

      return buttonContainer;
    }

    addClickListener() {
      this.copyButton.addEventListener('click', event => {
        event.preventDefault();

        const { link, title } = this.getLinkAndTitle();

        this.copy(link);

        setTimeout(() => {
          this.copy(title);
        }, 200);
      });
    }

    getLinkAndTitle() {
      const link = document.querySelector('#code2 > ol > li').innerHTML;
      const title = document.querySelector('#subject_tpc').innerHTML;

      return { link, title };
    }

    copy(text) {
      return navigator.clipboard.writeText(text);
    }

    setup() {
      this.injectCopyButton();
      this.addClickListener();
    }
  }

  const copyLinkAndTitleInstance = new CopyLinkAndTitle();

  copyLinkAndTitleInstance.setup();
})();
