const ENGLISH_LABEL = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

const QUESTION_LEVEL_1_LIST = [
  '行政管理',
  '機械工程',
  '軟體開發',
  '商業管理',
  '設計藝術',
  '機械工程',
  '機械工程',
  '機械工程',
  '機械工程',
  '機械工程',
  '機械工程',
  '機械工程',
  '機械工程',
  '機械工程',
]

const QUESTION_LEVEL_2_LIST = [
  '多媒體開發主管',
  '廣告設計',
]

const QUESTION_LEVEL_3_LIST = [
  '您是否曾經遇到過必須重新引導他人的活動以符合組織的願景和價值觀的情況？你做了什麼？',
  '說出你工作量繁重並被賦予一項艱鉅的任務並且必須完成的時間。當時情況如何？',
  '描述一個你不得不與一位難相處的同事一起工作的經歷。你是如何克服任何利益衝突的？',
  '什麼時候你被分配了一項具有挑戰性的任務並且不得不在沒有任何指導的情況下領導它？',
  '您是否曾經遇到過必須重新引導他人的活動以符合組織的願景和價值觀的情況？你做了什麼？',
  '說出你工作量繁重並被賦予一項艱鉅的任務並且必須完成的時間。當時情況如何？',
  '描述一個你不得不與一位難相處的同事一起工作的經歷。你是如何克服任何利益衝突的？',
  '什麼時候你被分配了一項具有挑戰性的任務並且不得不在沒有任何指導的情況下領導它？',
  '您是否曾經遇到過必須重新引導他人的活動以符合組織的願景和價值觀的情況？你做了什麼？',
  '說出你工作量繁重並被賦予一項艱鉅的任務並且必須完成的時間。當時情況如何？',
  '描述一個你不得不與一位難相處的同事一起工作的經歷。你是如何克服任何利益衝突的？',
  '什麼時候你被分配了一項具有挑戰性的任務並且不得不在沒有任何指導的情況下領導它？',
]

$(function () {
  $('.header__icon.icon-question').on('click', function () {
    $('.header__search__wrap').stop().fadeToggle()
  })

  $('.header__icon.icon-notification').on('click', function () {
    $('.remind__message__wrap').stop().fadeToggle()
  })

  $('.header__icon.icon-profile').on('click', function () {
    $('.header__member__wrap').stop().fadeToggle()
  })

  // non rest api
  $('.switch__wrap .switch__item:first-child').addClass('active')
  $('.switch__wrap .switch__content:first-child').removeClass('hidden')
  $('.switch__wrap .switch__item').on('click', function () {
    const target = Array.from(this.classList)
    const chose = target.findIndex(item => item !== 'switch__item' && item !== 'active')
    $(`.switch__wrap .switch__content.${target[chose]}`).stop().removeClass('hidden').siblings().addClass('hidden')
    $(this).addClass('active').siblings().removeClass('active')    
  })

  $('.form__textarea').on('keypress', function () {
    $('.form__textarea-quantity').text(`${$(this).val().length} / 500`)
  })

  $('.plan-buy__wrap').hide()
  $('.plan-buy__detail__close').on('click', function () {
    togglePopupView(false)
    $('.plan-buy__wrap').hide()
  })
  $('.plan-record-all__button.button.black').on('click', function () {
    togglePopupView(true)
    $('.plan-buy__wrap').show()
  })

  const togglePopupView = (bol) => {
    if (bol) {
      if (bol) $('body > .container').addClass('popop')
      else $('body > .container').removeClass('popop')
    } else {
      $('body > .container').toggleClass('popop')
    }
  }


  // drag input
  const dragenter = (e) => {
    e.stopPropagation()
    e.preventDefault()
  }

  const dragover = (e) => {
    e.stopPropagation()
    e.preventDefault()
  }

  const drop = (e) => {
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

  const imgInput = (e) => {
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

  $('.forget-button').on('click', function () {
    message('密碼更新成功，請輸入新密碼進行登入')
  })

  $('.sign-up__button').on('click', function () {
    message('錯誤訊息', 'err')
  })

  $('.letter-delete').on('click', function () {
    popup('刪除職缺通知', '您確定要刪除此職缺嗎？')
  })

  // message
  const message = (text, type='secure') => {
    const icon = $('<div class="icon icon-18px bg"></div>')
    const typeLabel = type === 'secure' ? 'icon-double-check-mark bg-green' : 'icon-security bg-red'
    icon.addClass(typeLabel)

    const element = $('<div></div>')
    element.text(text)
    element.addClass(`message_item flex ${type}`)
    element.appendTo('.message_list')
    icon.prependTo(element)

    setTimeout(() => {
      element.fadeOut(300, function() { $(this).remove() })
    }, 3000)
  }

  // popup
  const popup = (title, text) => {
    const templete = $(`
      <div class="pop__wrap">
        <div class="pop__container flex flex-col">
          <div class="pop__top flex items-center">
            <div class="pop__icon icon icon-18px icon-notification"></div>
            <div class="font text-18px"> ${title}</div>
            <button class="pop__close icon icon-18px icon-close"></button>
          </div>
          <div class="pop__content flex-1 font text-16px">${text}</div>
          <div class="pop__bottom flex items-center">
            <button class="pop__cancel button black shadow flex-1">取消</button>
            <button class="pop__confirm button white shadow flex-1">正確</button>
          </div>
        </div>
      </div>
    `)
    togglePopupView(true)
    templete.appendTo('body')

    templete.find('.pop__close').on('click', function () {
      templete.fadeOut(200, function() { $(this).remove() })
      togglePopupView(false)
    })

    templete.find('.pop__cancel').on('click', function () {
      templete.fadeOut(200, function() { $(this).remove() })
      togglePopupView(false)
    })

    templete.find('.pop__confirm').on('click', function () {
      submit()
      templete.fadeOut(200, function() { $(this).remove() })
      togglePopupView(false)
    })
  }

  const submit = () => {
    message('我的寄送範本已更新')
    console.log('submit')
  }

  // question
  if ($('.vacancies__content-setup-2').length) {
    for (const [index, value] of Object.entries(QUESTION_LEVEL_1_LIST)) {
      const templeteLevel1 = $(`
        <div>
          <div class="number">${ENGLISH_LABEL.at(index)}</div>
          <div class="label">${value}</div>
        </div>
      `)
      templeteLevel1.addClass(['vacancies-setup-2-level-1__item', 'flex', 'items-center', 'font', 'text-16px'])
      templeteLevel1.appendTo('.vacancies-setup-2-level-1__list')
      templeteLevel1.on('click', function () {
        templeteLevel1.addClass('active').siblings().removeClass('active')
        $('.vacancies-setup-2-level-2__list').empty()
        $('.vacancies-setup-2-level-3__list').empty()
        $('.vacancies__content-setup-2__chose__container').empty()
  
        for (const [index, items] of Object.entries(QUESTION_LEVEL_2_LIST)) {
          const templeteLevel2 = $(`
            <div>
              <div class="number">${(Number(index) + 1).toString().padStart(2, '0')}</div>
              <div class="label">${items}</div>
            </div>
          `)
          templeteLevel2.addClass(['vacancies-setup-2-level-2__item', 'flex', 'items-center', 'font', 'text-16px'])
          templeteLevel2.appendTo('.vacancies-setup-2-level-2__list')
          templeteLevel2.on('click', function () {
            $(templeteLevel2).addClass('active').siblings().removeClass('active')
            $('.vacancies-setup-2-level-3__list').empty()
            $('.vacancies__content-setup-2__chose__container').empty()
    
            for (const [index, item] of Object.entries(QUESTION_LEVEL_3_LIST)) {
              const templeteLevel3 = $(`
                <div>
                  <input id="${index}" type="checkbox">
                  <label for="${index}"  class="flex items-center">
                    <div class="number">Q${ Number(index) + 1 }</div>
                    <div class="label">${item}</div>
                  </label>
                </div>
              `)
              templeteLevel3.addClass(['vacancies-setup-2-level-3__item', 'font', 'text-16px', 'flex', 'items-center'])
              templeteLevel3.appendTo('.vacancies-setup-2-level-3__list')
              templeteLevel3.on('click', function () {
                $('.vacancies__content-setup-2__chose__container').empty()
                $.each($('.vacancies-setup-2-level-3__item'), function(index) {
                  console.log('aa', templeteLevel2.find('.label').text())
                  if ($(this).find('input').prop('checked')) {
                    const templeteLevel4 = $(`
                      <div>
                        <div class="number">${index + 1}</div>
                        <div class="label">
                          <div class="title">${templeteLevel2.find('.label').text()}</div>
                          <div class="sub">${templeteLevel3.find('.label').text()}</div>
                        </div>
                      </div>
                    `)
                    templeteLevel4.addClass(['vacancies-setup-2-level-4__item', 'flex', 'items-center', 'font', 'text-16px'])
                    templeteLevel4.appendTo('.vacancies__content-setup-2__chose__container')
                  }
                })
              })
            }
  
          })
        }
      })
    }

    $('.vacancies__content-setup-2__chose__button').on('click', function () {
      questopmPopup()
    })

    const questopmPopup = () => {
      const templete = $(`
        <div class="pop__wrap">
          <div class="pop__container flex flex-col">
            <div class="pop__top flex items-center">
              <div class="pop__icon icon icon-18px icon-notification"></div>
              <div class="font text-18px">客製題目</div>
              <button class="pop__close icon icon-18px icon-close"></button>
            </div>
            <div class="pop__tips flex items-center">
              <div class="icon icon-14px icon-security bg bg-red"></div>
              <div class="pop__label font text-12px color-red">請注意題目內容上限200字。</div>
            </div>
            <div class="question-pop__content flex-1 font text-16px">
              <div class="pop__content__title font text-14px">題目內容</div>
              <div class="pop__content__textarea">
                <textarea placeholder="請輸入題目內容"></textarea>
                <div class="pop__content__textarea__count"></div>
              </div>
            </div>
            <div class="pop__bottom flex items-center">
              <button class="pop__confirm button black shadow flex-1">確認</button>
            </div>
            <div class="pop__bottom__tips font text-12px">點選「確定」，完成客製化題目創建</div>
          </div>
        </div>
      `)
      togglePopupView(true)
      templete.appendTo('body')

      $('.pop__content__textarea__count').text('0 / 200')
      $('.pop__content__textarea textarea').on('keyup', () => {
        console.log('????')
        $('.pop__content__textarea__count').text(`${$('.pop__content__textarea textarea').val().length} / 200`)
      })
  
      templete.find('.pop__close').on('click', function () {
        templete.fadeOut(200, function() { $(this).remove() })
        togglePopupView(false)
      })
  
      templete.find('.pop__confirm').on('click', function () {
        submit()
        templete.fadeOut(200, function() { $(this).remove() })
        togglePopupView(false)
      })
    }
  }

  $('#date-before').datepicker({
    dayNamesMin: [ "S", "M", "T", "W", "T", "F", "S" ],
  })
  $('#date-after').datepicker({
    dayNamesMin: [ "S", "M", "T", "W", "T", "F", "S" ],
  })
  $('select').selectmenu()
})