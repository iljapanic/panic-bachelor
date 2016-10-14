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
    $('h2, h3').each(function (index, value) {
      var newId = $(this).text()
      var newIdNormalized = newId.replace(/\s+/g, '-').toLowerCase()
      $(this).attr('id', newIdNormalized)
    })

    // generate TOC
    $('h2').not('.toc-ignore').each(function (index, value) {
      var headingContent = $(this).text()
      var headingId = headingContent.replace(/\s+/g, '-').toLowerCase()

      var parentElemement = $(this).parent('.section')
      var subheadingsArray = []
      var subheadings = parentElemement.children('h3').each(function (index, value) {
        var subheadingContent = $(this).text()
        var subheadingId = subheadingContent.replace(/\s+/g, '-').toLowerCase()
        subheadingsArray.push({
          title: subheadingContent,
          link: subheadingId
        })
      })

      var subheadingsItems = $.map(subheadingsArray, function (value) {
        return ('<li><a href=\"#' + value.link + '\">' + value.title + '</a></li>')
      }).join('')

      $('.toc').append(
        '<li class=\"toc__item\">' +
        '<a href=\"#' +
        headingId +
        '">' +
        headingContent +
        '</a>' +
        (subheadings.length > 0 ?
          '<ul>' +
          subheadingsItems +
          '</ul>'
          :
          '<span class=\"visually-hidden\">no level 3 headings</span>'
        ) +
        '</li>'
      )

    })
  }
  dynamicToc()

  // TOC DYNAMIC CLASS
  function setTocClass () {
    var screenSize = $(window).width()
    var tocElement = $('.toc')

    if (screenSize < 1024) {
      tocElement.removeClass('is-desktop')
      tocElement.addClass('is-mobile')
    } else {
      tocElement.removeClass('is-mobile')
      tocElement.addClass('is-desktop')
    }
  }
  setTocClass()

  function updateTocClass () {
    $(window).resize(function () {
      console.log($(window).width)
      setTocClass()
    })
  }
  setInterval(updateTocClass, 1500)


  // FIX TOC
  $('.main').waypoint(function (direction) {
    // $('.toc').addClass('is-fixed')
    if (direction === 'down') {
      $('.toc').addClass('is-fixed')
    } else {
      $('.toc').removeClass('is-fixed')
    }
  })

})
