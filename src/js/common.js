$(function () {
  $('.header__icon.icon-question').click(() => {
    $('.header__search__wrap').stop().fadeToggle()
  })

  $('.header__icon.icon-notification').click(() => {
    $('.remind__message__wrap').stop().fadeToggle()
  })

  $('.header__icon.icon-profile').click(() => {
    $('.header__member__wrap').stop().fadeToggle()
  })

  // non rest api
  $('.switch__wrap .switch__item:first-child').addClass('active')
  $('.switch__wrap .switch__content:first-child').removeClass('hidden')
  $('.switch__wrap .switch__item').click(function() {
    const target = Array.from(this.classList)
    const chose = target.findIndex(item => item !== 'switch__item' && item !== 'active')
    $(`.switch__wrap .switch__content.${target[chose]}`).stop().removeClass('hidden').siblings().addClass('hidden')
    $(this).addClass('active').siblings().removeClass('active')    
  })

  $('.form__textarea').keypress(function() {
    $('.form__textarea-quantity').text(`${$(this).val().length} / 500`)
  })

  $('.plan-buy__wrap').hide()
  $('.plan-buy__detail__close').on('click', function () {
    $('body > .container').css('filter', '')
    $('.plan-buy__wrap').hide()
  })
  $('.plan-record-all__button.button.black').on('click', function () {
    $('body > .container').css('filter', 'brightness(.5) blur(5px)')
    $('.plan-buy__wrap').show()
  })


  // drag input
  function dragenter(e) {
    e.stopPropagation()
    e.preventDefault()
  }

  function dragover(e) {
    e.stopPropagation()
    e.preventDefault()
  }

  function drop(e) {
    e.stopPropagation()
    e.preventDefault()

    const dt = e.dataTransfer
    const files = dt.files

    $('.plan-buy__update__img__label').text(files[0].name)
    const reader = new FileReader()
    reader.onload = (e => {
      $('.plan-buy__update__img__wrap').removeClass('hidden').css('display', 'flex')
      $('.plan-buy__update__img__img').attr("src", e.target.result)
    })
    reader.readAsDataURL(files[0])
  }

  function imgInput (e) {
    $('.plan-buy__update__img__label').text(e.target.files[0].name)
    const reader = new FileReader()
    reader.onload = (e => {
      $('.plan-buy__update__img__wrap').removeClass('hidden').css('display', 'flex')
      $('.plan-buy__update__img__img').attr("src", e.target.result)
    })
    reader.readAsDataURL(e.target.files[0])
  }

  const dropbox = document.querySelector('.plan-buy__input')
  if (dropbox) {
    dropbox.addEventListener("dragenter", dragenter, false);
    dropbox.addEventListener("dragover", dragover, false);
    dropbox.addEventListener("drop", drop, false);
    dropbox.addEventListener("change", imgInput, false);
  }

  const isWebsite = $('.content-article.website')
  if (isWebsite) {
    $('.website-link__url').on('keyup', function () {
      const text = $(this).val()
      const input = $('.website-preview__url')
      if (text.length) input.text(text)
      else input.text('www.lucy.website')
    })

    $('.form__input#company').on('keyup', function () {
      const text = $(this).val()
      const input = $('.website-preview__banner-center__title')
      if (text.length) input.text(text)
      else input.text('標題名稱')
    })

    $('.website-config__banner__input').on('change', function () {
      const value = $(this)[0].files[0]
      const reader = new FileReader()
      reader.onload = (e => {
        $('.website-preview__banner__img').attr("src", e.target.result)
        $('.website-config__banner__img').attr("src", e.target.result)
      })
      reader.readAsDataURL(value)
    })

    $('.website-config__logo__input').on('change', function () {
      const value = $(this)[0].files[0]
      const reader = new FileReader()
      reader.onload = (e => {
        $('.website-preview__banner-center__logo__img').attr("src", e.target.result)
        $('.website-config__logo__img').attr("src", e.target.result)
      })
      reader.readAsDataURL(value)
    })
  }

  const isUser = $('.container.user')
  if (isUser) {
    $('.user-form__type__wrap').children().first().show().siblings().hide()
    $('.user-form__chose__input').on('click', function () {
      const chose = $(this).attr('value')
      $(this).parents('.user-form__chose__wrap').find('.user-form__type__wrap').children(`.${chose}`).show().siblings().hide()
    })
  }

  // message

  // form validation
  // https://www.w3schools.com/js/js_validation.asp
  // https://www.w3schools.com/js/tryit.asp?filename=tryjs_validation_check
  // https://www.w3schools.com/js/js_validation_api.asp
})