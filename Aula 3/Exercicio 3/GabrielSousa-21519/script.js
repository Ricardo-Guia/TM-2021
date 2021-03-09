// Your JS Script here

window.onload = () => {
  const ulList = document.getElementsByTagName('ul')
  /* One way of doing it
    getAttributes = (linkInfo) => {
      let linhaId = document.createElement('li')
      linhaId.append('ID: ' + linkInfo.id)

      let linhaHref = document.createElement('li')
      linhaHref.append('href: ' + linkInfo.href)

      let linhaTarget = document.createElement('li')
      linhaTarget.append('target: ' + linkInfo.target)

      let linhaType = document.createElement('li')
      linhaType.append('type: ' + linkInfo.type)

      ulList[0].append(linhaId, linhaHref, linhaTarget, linhaType)
   */
  getAttributes = (linkInfo) => {
    for (let i = 0; i < linkInfo.attributes.length; i++) {
      /* This one OR
      let dummy = document.createElement('li')
      dummy.append(linkInfo.attributes[i].localName + ": "+ linkInfo.attributes[i].value)
      ulList[0].append(dummy) */

      ulList[0].append((() => {
        let dummy = document.createElement('li')
        dummy.append(linkInfo.attributes[i].localName + ": " + linkInfo.attributes[i].value)
        return dummy
      })())

    }
  }

  changeColor = () => {
    let titulos = document.getElementsByClassName('titulo')
    for (let i = 0; i < titulos.length; i++) {
      titulos[i].style.color = "red"
    }
  }

  for (let elem of document.getElementsByTagName('td')) {
    elem.onclick = (clickedEvent) => {
      const response = prompt('Novo valor para a celula')
      const targetElement = clickedEvent.target
      targetElement.style.background = 'green'
      targetElement.innerText = response
    }
  }
}


