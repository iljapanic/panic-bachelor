$(document).ready(function () {
  // SMOOTH SCROLL
  $(function () {
    $('a[href*="#"]:not([href="#"])').click(function () {
      if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
        var target = $(this.hash)
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']')
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000)
          return false
        }
      }
    })
  })

  // DYNAMIC TABLE OF CONTENTS
  function dynamicToc () {
    // add id to headings
    $('h2').not('.toc-ignore').each(function (index, value) {
      var newId = $(this).text()
      var newIdNormalized = newId.replace(/\s+/g, '-').toLowerCase()
      $(this).attr('id', newIdNormalized)
    })

    // generate TOC
    $('h2').not('.toc-ignore').each(function (index, value) {
      var headingContent = $(this).text()
      var headingId = headingContent.replace(/\s+/g, '-').toLowerCase()

      $('.toc').append(
        '<li><a href="#' + headingId + '">' + headingContent + '</a></li>'
      )
    })
  }
  dynamicToc()

  // REVEAL TOC ON SCROLL
  function update () {
    if ($(window).scrollTop() > 1600) {
      $('.toc').animate({
        'opacity': '1'
      }, 300)
    } else {
      $('.toc').animate({
        'opacity': '0'
      }, 300)
    }
  }
  setInterval(update, 500)
})
