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
    var tocElement = $('.toc')
    var tocList = $('.toc__list')

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

      tocList.append(
        '<li class=\"toc__item\">' + // level 2 item
        '<a href=\"#' + // level 2 item-link
        headingId +
        '">' +
        headingContent +
        '</a>' + // END level 2 item-link
        (subheadings.length > 0 // level 3 conditional
          ? '<ul>' + // level 3 list
          subheadingsItems + // level 3 item
          '</ul>' // END level 3 list
          : '<span class=\"visually-hidden\">no level 3 headings</span>'
        ) +
        '</li>' // END level 2 item
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
    var tocElement = $('.toc')

    if (direction === 'down') {
      tocElement.addClass('is-fixed')
    } else {
      tocElement.removeClass('is-fixed')
    }
  })

  // TOC TOGGLE
  $('.toc__toggle').click(function () {
    $('.toc__list, .toc__close').toggleClass('is-active')
  })

  $('.toc__close').click(function () {
    $('.toc__list').removeClass('is-active')
    $('.toc__close').removeClass('is-active')
  })

  $('.toc__list a').click(function () {
    // alert('link in the .toc__list clicked!')
    $('.toc__list').removeClass('is-active')
    $('.toc__close').removeClass('is-active')
  })
})
