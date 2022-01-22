$(function () {
  $('.header__icon.remind').click(() => {
    $('.header__search__wrap').stop().fadeToggle()
  })

  $('.header__icon.remind').click(() => {
    $('.remind__message__wrap').stop().fadeToggle()
  })

  $('.header__icon.member').click(() => {
    $('.header__member__wrap').stop().fadeToggle()
  })

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

    console.log(e)


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
})