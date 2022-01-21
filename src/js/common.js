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
  $('.switch__wrap .switch__content:first-child').show()
  $('.switch__wrap .switch__item').click(function() {
    const target = Array.from(this.classList)
    const chose = target.findIndex(item => item !== 'switch__item' && item !== 'active')
    $(`.switch__wrap .switch__content.${target[chose]}`).stop().fadeIn().siblings().hide()
    $(this).addClass('active').siblings().removeClass('active')    
  })
})