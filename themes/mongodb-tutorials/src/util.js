import domslider from 'dom-slider'
import elementClass from 'element-class'

const utils = {
  setupCopyButtons () {
    const copyableBlocks = document.getElementsByClassName('highlight')
    for (const highlightElement of copyableBlocks) {
      const text = highlightElement.innerText.trim()
      const copyButtonContainer = document.createElement('div')
      const copyButton = document.createElement('button')
      copyButtonContainer.className = 'copy-button-container'
      copyButton.className = 'copy-button'
      copyButton.appendChild(document.createTextNode('Copy'))
      copyButtonContainer.appendChild(copyButton)
      highlightElement.insertBefore(copyButtonContainer, highlightElement.children[0])
      copyButton.addEventListener('click', () => {
        const tempElement = document.createElement('textarea')
        document.body.appendChild(tempElement)
        tempElement.value = text
        tempElement.select()

        try {
          const successful = document.execCommand('copy')
          if (!successful) {
            throw new Error('Failed to copy')
          }
        } catch (err) {
          console.error('Failed to copy')
          console.error(err)
        }

        document.body.removeChild(tempElement)
      })
    }
  },

  setupSidebar () {
    const tocLinks = document.querySelectorAll('.toc__link')

    tocLinks.forEach((link) => {
      // handle opening & closing of the toc
      const nestedList = link.nextElementSibling

      if (nestedList) {
        link.addEventListener('click', (e) => {
          elementClass(link).toggle('toc__link--open')
          nestedList.slideToggle(400)
        })
      }

      link.addEventListener('click', (e) => {
        tocLinks.forEach(l => elementClass(l).remove('toc__link--active'))
        elementClass(link).add('toc__link--active')
      })
    })
  },

  // this is currently only used on the landing pages
  setupList () {
    const links = document.querySelectorAll('.list__item__title')

    links.forEach((link) => {
      const nestedList = link.nextElementSibling

      link.parentElement.addEventListener('click', (e) => {
        elementClass(link).toggle('list__item--open')
        nestedList.slideToggle(400)
      })
    })
  },
}

export default utils
