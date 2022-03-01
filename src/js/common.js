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
  // date change
  $('#date-before').datepicker({
    dayNamesMin: [ "S", "M", "T", "W", "T", "F", "S" ],
    dateFormat: 'yy-dd-mm',
  })
  $('#date-after').datepicker({
    dayNamesMin: [ "S", "M", "T", "W", "T", "F", "S" ],
    dateFormat: 'yy-dd-mm',
  })

  // select
  $('select').selectmenu()

  // message
  function message ({ text, icons, type, second, button }) {
    const icon = $('<div class="icon icon-18px bg"></div>')
    const typeLabel = icons || 'icon-double-checkmark bg-green-message'
    const types = type || 'secure'
    const time = second === null ? null : Number(second) || 3000
    icon.addClass(typeLabel)

    return new Promise((reslove) => {
        const element = $('<div></div>')
        element.text(text)
        if (button) {
          const buttonElement = $(`<div class="massage__button flex items-center ml-34px"></div>`)

          for (const item of button) {
            const buttonItem = $(`
              <div class="massage__button__${item.id} button sm black shadow mx-8px">${item.label}</div>
            `)

            if (item.icon) {
              const iconElement = $(`<div class="icon icon-18px ${item.icon} bg bg-white"></div>`)
              iconElement.prependTo(buttonItem)
            }

            buttonItem.appendTo(buttonElement)

            buttonItem.on('click', function () {
              reslove(item.id)
              $(element).fadeOut(300, function() { $(element).remove() })
            })
          }

          // close button
          const close = $('<div class="icon icon-14px icon-close cursor-pointer ml-12px"></div>')
          close.on('click', function () {
            $(element).fadeOut(300, function() { $(element).remove() })
          })
          close.appendTo(buttonElement)

          buttonElement.appendTo(element)
      }
      element.addClass(`message_item flex items-center ${types}`)
      element.appendTo('.message_list')
      icon.prependTo(element)

      function setTop () {
        const itemList = $('.message_list').children()
        $.each(itemList, function (index) {
          if (index) $(this).css('top', `${(index * 56) + 30}px`)
          else $(this).css('top', '20px')
        })
      }

      setTop()

      if (time) {
        setTimeout(() => {
          element.fadeOut(300, function() {
            $(this).remove()
            setTop()
            reslove('complete')
          })
        }, time)
      }

    })
  }

  // popup
  function popup ({ title, sub, text, button }) {
    // button [ { bg: 'white', label: 'label', submit: 'any' } ]
    let buttonElement = ''
    if (button) {
      for (const [index, item] of Object.entries(button)) {
        const target = `<button class="pop__${ item.submit } button ${ item.bg } shadow flex-1 ${index !== 0 ? 'mr-14px' : ''}">${ item.label }</button>`
        buttonElement += target
      }
    } else {
      buttonElement = `
        <button class="pop__cancel button black shadow flex-1 mr-14px">取消</button>
        <button class="pop__confirm button white shadow flex-1">正確</button>
      `
    }

    const templete = $(`
      <div class="pop__wrap">
        <div class="pop__container flex flex-col">
          <div class="pop__top flex items-center">
            <div class="pop__icon mr-12px icon icon-18px icon-notification"></div>
            <div class="font text-18px"> ${title}</div>
            <button class="pop__close icon icon-18px icon-close"></button>
          </div>
          <div class="pop__sub font text-16px mb-14px mt-26px"></div>
          <div class="pop__content flex-1 font text-14px"></div>
          <div class="pop__bottom flex items-center">${buttonElement}</div>
        </div>
      </div>
    `)

    if (sub) templete.find('.pop__sub').html(sub)
    if (text) templete.find('.pop__content').html(text)

    togglePopupView(true)
    templete.appendTo('body')

    return new Promise((reslove) => {
      templete.find('.pop__close').on('click', function () {
        templete.fadeOut(200, function() { $(this).remove() })
        togglePopupView(false)
        reslove('close')
      })

      $.each(templete.find('.pop__bottom').children(), function () {
        $(this).on('click', function () {
          templete.fadeOut(200, function() { $(this).remove() })
          togglePopupView(false)
          const target = $(this).attr('class').split(' ')[0].split('__')[1]
          reslove(target)
        })
      })
    })
  }

  // switch
  $('.switch__wrap .switch__item:first-child').addClass('active')
  $('.switch__wrap .switch__content:first-child').removeClass('hidden')
  $('.switch__wrap .switch__item').on('click', function () {
    const target = Array.from(this.classList)
    const chose = target.findIndex(item => item !== 'switch__item' && item !== 'active')
    $(`.switch__wrap .switch__content.${target[chose]}`).stop().removeClass('hidden').siblings().addClass('hidden')
    $(this).addClass('active').siblings().removeClass('active')    
  })

  // textarea
  function textareaBuild () {
    $.each($('.field__textarea__wrap'), function () {
      const element = $(this).children('textarea')
      const count = $(this).attr('data-count')
      const show = $(`<div class="field__textarea-quantity"></div>`)
      show.appendTo($(this))
      show.text(`0 / ${count}`)
      $(element).on('blur keyup input', function () {
        show.text(`${element.val().length} / ${count}`)
        if (element.val().length > parseInt(count)) {
          const text = JSON.parse(JSON.stringify(element.val().slice(0, parseInt(count))))
          element.val(text)
        }
        show.text(`${element.val().length} / ${count}`)
      })
    })
  }

  // popup
  const togglePopupView = (bol) => {
    if (bol) {
      if (bol) $('body > .container').addClass('popup')
      else $('body > .container').removeClass('popup')
    } else $('body > .container').toggleClass('popup')
  }

  // drag input file
  const drapInputFile = () => {
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
      dropbox.addEventListener('dragenter', dragenter, false);
      dropbox.addEventListener('dragover', dragover, false);
      dropbox.addEventListener('drop', drop, false);
      dropbox.addEventListener('change', imgInput, false);
    }
  }
  drapInputFile()

  // website 徵才網站
  if ($('body').has('#website').length) {
    $('.website-link__url').on('keyup', function () {
      const text = $(this).val()
      const input = $('.website-preview__url')
      if (text.length) input.text(text)
      else input.text('recruit.website')
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

    $('.website-close-all-job__button').on('click', function () {
      popup({ title: '關閉所有職缺', sub: '您確定要關閉所有職缺嗎？', text: '如果按下確認，您的徵才網站的所有職缺即被關閉。' })
        .then(res => {
          switch (res) {
            case 'confirm':
              message({ text: '全部職缺已經被關閉！' })
          }
        })
    })
  }

  // website 徵才網站-體驗升級
  if ($('body').has('#website-non').length) {
    const tipsPop = () => {
      popup({
        title: '注意',
        sub: '升級體驗更多',
        text: '體驗版此功能無法使用，歡迎升級方案享受露西助理更多服務！',
        button: [
          { bg: 'black', label: '升級', submit: 'upgrade' }, 
          { bg: 'white', label: '了解', submit: 'understand' }, 
        ],
      })
        .then(res => {
          switch (res) {
            case 'upgrade':
            case 'understand':
              console.log(res)
          }
        })
    }

    $('.website-link__url').on('keyup', function () { tipsPop() })
    $('.form__input#company').on('keyup', function () { tipsPop() })
    $('.website-config__banner__input').on('change', function () { tipsPop() })
    $('.website-config__logo__input').on('change', function () { tipsPop() })
    $('.website-close-all-job__button').on('click', function () { tipsPop() })

  }

  // 登入  
  if ($('body').has('sign-in').length) {
    $('.sign-form').validate({
      rules: {
        mail: {
          required: true,
        },

        password: {
          required: true,
        },
      },
      
      errorPlacement: function(error, element) {},
      
      submitHandler: function(form) {
        form.submit()
      }
    })

    $('.sign-button').on('click', function () {
      $('.sign-form').validate()
      if (!$('.sign-form').valid()) message({ text: '輸入錯誤請重新輸入', icons: 'icon-security bg-red' })
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

  // header
  $('body').on('click', function(){
    if ($('.header__search__wrap').is(':visible')) $('.header__search__wrap').stop().fadeOut()
    if ($('.remind__message__wrap').is(':visible')) $('.remind__message__wrap').stop().fadeOut()
    if ($('.header__member__wrap').is(':visible')) $('.header__member__wrap').stop().fadeOut()
  })

  $('.header__search__wrap').on('click', function (e) {
    e.stopPropagation()
  })

  $('.header__icon.icon-search').on('click', function (e) {
    e.stopPropagation()
    $('.header__search__wrap').stop().fadeToggle()
  })

  $('.header__icon.icon-notification').on('click', function (e) {
    e.stopPropagation()
    $('.remind__message__wrap').stop().fadeToggle()
  })

  $('.header__icon.icon-profile').on('click', function (e) {
    e.stopPropagation()
    $('.header__member__wrap').stop().fadeToggle()
  })

  // 註冊
  $('.forget-button').on('click', function () {
    message({ text: '密碼更新成功，請輸入新密碼進行登入' })
  })

  $('.sign-up__button').on('click', function () {
    message({ text: '錯誤訊息', type: 'err', icons: 'icon-security bg-red' })
  })

  // 首頁 index
  if ($('body').has('#home').length) {
    $(document).ready(function () {
      const swiper = new Swiper('.swiper', {  
        spaceBetween: 23,
        slidesPerView: 4,
        width: 1245,
  
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      })
    })
  }

  // 首頁停用 index-non
  if ($('body').has('#home-non').length) {
    message({ text: '您的帳號已被停用，如有任何疑問請聯繫我們！', type: 'err', icons: 'icon-security bg-red', second: null, })
  }

  // 設定 setting
  if ($('body').has('#setting').length) {
    textareaBuild ()

    $('.send-verification').on('click', function () {
      message({ text: '驗證碼已經寄送到所填入的信箱' })
    })

    $('.setting-save').on('click', function () {
      message({ text: '密碼完成更新！' })
    })

    $('.letter-save').on('click', function () {
      message({ text: '我的寄送範本已更新' })
    })
  
    $('.letter-delete').on('click', function () {
      popup({ title: '刪除職缺通知', text: '您確定要刪除此職缺嗎？' })
        .then(res => {
          switch (res) {
            case 'confirm':
              message({ text: '我的寄送範本已刪除' })
          }
        })
    })
  }

  // 職缺 opening
  if ($('body').has('#opening').length) {
    $.widget('ui.tooltip', $.ui.tooltip, {
      options: {
        content: function () {
          return $(this).prop('title');
        }
      }
    });
    $(document).tooltip({
      open: function (event, ui) {
        ui.tooltip.css('max-width', '600px');
      },
      position: {
        my: 'center center',
        at: "center+50 center",
      }
    })

    $('.opening-open-response__button').on('click', function () {
      message({ text: '您已成功開啟職缺，請立即公開應徵！', icons: 'icon-boy bg-green-message' })
    })

    $('.opening-close__button').on('click', function () {
      popup({ title: '關閉職缺通知', sub: '您確定要關閉此職缺嗎？' })
      .then(res => {
        switch (res) {
          case 'confirm':
            message({ text: '您已成功關閉職缺！', icons: 'icon-boy bg-green-message' })
        }
      })
    })

    $('.opening-detele__button').on('click', function () {
      message({ text: '您已成功刪除職缺！', icons: 'icon-boy bg-green-message' })
    })
  }

  // 職缺 opening-setup-1
  if ($('body').has('#opening-setup-1').length) {
    textareaBuild ()
    $('.website-preview__step-1').show().siblings().hide()

    let step = 1
    $(`.opening-setup-1__step-${step}`).show().siblings().hide()

    $('.setup-1-next__button').on('click', function () {
      if (step === 3) location.href = '/opening-setup-2.html'
      else {
        step++
        $(`.opening-setup-1__step-${step}`).show().siblings().hide()

        const view = [1, 2].includes(step) ? 1 : 2
        $(`.website-preview__step-${view}`).show().siblings().hide()
      }
    })

    $('#opening-setup-1-title').on('blur keyup input', function () {
      const text = $(this).val() || '工作職稱'
      $('#website-title').html(text)
    })

    $('#opening-setup-1-content').on('blur keyup input', function () {
      const text = $(this).val() || '此處為工作內容細節，等待您輸入。'
      $('#website-content').html(text)
    })

    $('#opening-setup-1-condition').on('blur keyup input', function () {
      const text = $(this).val() || '此處為需求條件細節，等待您輸入。'
      $('#website-condition').html(text)
    })

    $.each($('.website-preview__text'), function() {
      $(this).text('等待您輸入')
    })
    
    $('#opening-setup-1-salary').on('selectmenuchange', function() {
      const type = `${$(this).val()} ` || ''
      const text = $('#opening-setup-1-count').val() || '等待您輸入'
      $('#opening-setup-1-treatment').text(type + text)
    })

    $('#opening-setup-1-count').on('blur keyup input', function() {
      const type = `${$('#opening-setup-1-salary').val()} ` || ''
      const text = $(this).val() || '等待您輸入'
      $('#opening-setup-1-treatment').text(type + text)
    })

    $('#opening-setup-1-type').on('selectmenuchange', function() {
      const text = $(this).val() || '等待您輸入'
      $('#opening-setup-1-nature').text(text)
    })

    $('#opening-setup-1-address').on('blur keyup input', function () {
      const text = $(this).val() || '等待您輸入'
      $('#opening-setup-1-place').text(text)
    })

    $('input[type=radio].checkbox__input').on('change', function() {
      const text = $(this).val() || '等待您輸入'
      $('#opening-setup-1-remote').text(text)
    })

    $('.vacancies-setup-detail__type__list.default input').on('change', function() {
      const $this = $(this)
      if ($this.is(':checked')) {
        const element = $(`
          <div class="field mb-22px">
            <div class="form__container flex flex-col">
              <label class="label">
                <span class="title">${$this.val()}</span>
                <span class="font color-red">*</span>
              </label>
              <input class="input"/>
            </div>
          </div>
        `)
        $(element).appendTo('.website-preview__step-1-default__list')
      } else {
        $.each($('.website-preview__step-1-default__list .field'), function() {
          if ($(this).find('.title').text().trim() === $this.val()) return $(this).remove()
        })
      }
    })

    $('.vacancies-setup-detail__type__list.chose input').on('change', function() {
      $('.website-preview__step-1-chose__list').empty()
      $.each($('.vacancies-setup-detail__type__list.chose .vacancies-setup-detail__type__item'), function() {
        if ($(this).children('input').is(':checked')) {
          const element = $(`
            <div class="field">
              <div class="form__container flex flex-col">
                <label class="label">
                  ${$(this).children('input').val()}
                </label>

                <div class="user-form__chose__wrap">
                  <div class="user-form__chose flex items-center">
                    <div class="user-form__chose__item">
                      <input class="user-form__chose__input" type="radio" value="input" checked/>
                      <label>連結</label>
                    </div>
                    <div class="user-form__chose__item">
                      <input class="user-form__chose__input" type="radio" value="input"/>
                      <label>檔案</label>
                    </div>
                  </div>
                  <div class="user-form__type__wrap">
                    <input class="user-form__item-input form__input input" placeholder="https://">
                    <div class="user-form__type__drop drop hidden">
                      <div class="user-form__type__drop__container">
                        <div class="website-config__banner__input__wrap user__update">
                          <div class="icon icon-18px icon-plus"></div>
                        </div>
                        <div class="user-form__type__drop__text">（支援檔案類型 pdf. doc. docx. jpg. png.  / 檔案上限 5 MB) </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `)

          $(element).appendTo('.website-preview__step-1-chose__list')
        }
      })
    })
  }

  // 面試者資料 response
  if ($('body').has('#response').length) {
    $('.candidate-item-question-link__item.copy').on('click', function () {
      message({ text: '複製成功！', icon: 'icon-copy  bg-green-message' })
    })

    $('.response__send-button').on('click', function () {
      const templete = $(`
        <div class="pop__wrap">
          <div class="pop__container flex flex-col">
            <div class="pop__top flex items-center">
              <div class="pop__icon mr-12px icon icon-18px icon-message"></div>
              <div class="font text-18px">發送郵件</div>
              <button class="pop__close icon icon-18px icon-close"></button>
            </div>
            <div class="pop__content flex-1 font text-14px">

              <div class="field mb-14px">
                <label class="label" for="templete">收件者<span>*</span></label>
                <div class="form__input input flex items-center">
                  <a class="response-chose__user mr-10px flex items-center font color-black">申愛利<span class="icon icon-6px icon-close ml-12px"></span></a>
                  <a class="response-chose__user mr-10px flex items-center font color-black">申愛利<span class="icon icon-6px icon-close ml-12px"></span></a>
                  <a class="response-chose__user mr-10px flex items-center font color-black">申愛利<span class="icon icon-6px icon-close ml-12px"></span></a>
                </div>
              </div>
              <div class="field mb-14px">
                <div class="label">郵件內容範本</div>
                <div class="form__templete">
                  <a class="setting-templete button white sm">邀請面試</a>
                  <a class="setting-templete button black sm">活潑的邀請面試</a>
                  <a class="setting-templete button white sm">錄取通知</a>
                  <a class="setting-templete button white sm">風趣但不失禮儀的邀請面試</a>
                </div>
              </div>
              <div class="field mb-16px">
                <label class="label">郵件內容</label>
                <div class="field__textarea__wrap" data-count="500">
                  <textarea class="field__textarea" placeholder="請輸入您對於該職缺的工作內容。"></textarea>
                <div class="field__textarea-quantity">0 / 500</div></div>
                <div class="form__text font text-12px"><a>#lucy.interview.link# </a>為虛擬面試連結，會自動生成並呈現專屬連結。</div>
              </div>

            </div>
            <div class="pop__bottom flex items-center justify-center">
              <button class="pop__confirm button black shadow flex items-center">
                <div class="icon icon-18px icon-message mr-10px bg bg-white"></div>
                <span>確認發送<span>
              </button>
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

      templete.find('.pop__confirm').on('click', function () {
        templete.fadeOut(200, function() { $(this).remove() })
        togglePopupView(false)
        message({ text: '寄送成功！', icons: 'icon-message  bg-green-message' })
      })
    })
  }

  // 面試者資料-方案到期 response-non
  if ($('body').has('#response-non').length) {
    message({ text: '您的方案已到期，如有任何疑問請聯繫我們！', type: 'err', icons: 'icon-security bg-red', second: null, })
  }

  // 面試者資料-體驗版 response-overlow
  if ($('body').has('#response-overflow').length) {
    message({ text: '您的面試者已滿，請升等方案！', type: 'err', icons: 'icon-security bg-red' })
    message({
      text: '您的面試者已滿，請升等方案！',
      type: 'err',
      icons: 'icon-security bg-red',
      second: null,
      button: [
        { id: 'submit', label: '前往升等', icon: 'icon-prize' },
      ]
    })
      .then(res => {
        switch (res) {
          case 'submit':
            location.href = '/plan.html'
            break          
        }
      })
  }

  // 職缺 opening-setup-2
  if ($('body').has('#opening-setup-2').length) {

    const data = new Proxy({}, {
      set: function (target, key, value) {
        target[key] = value
        path(target)
        return true
      }
    })

    // 麵包屑
    const path = (obj) => {
      const target = ['中文題庫']
      const map = Object.values(obj).map(item => item.label)
      $('.opening-setup-2__path__list').empty()
      for (const [index, item] of Object.entries(target.concat(map).reverse())) {
        const pathItem = $(`
          <div class="opening-setup-2__path__item flex items-center">
            <div class="opening-setup-2__path__label">${item}</div>
            ${index !== '0' ? '<div class="icon icon-12px icon-chevron mx-5px"></div>' : ''}
          </div>
        `)
        pathItem.prependTo('.opening-setup-2__path__list')
      }
    }
    path([])

    const LEVEL_TEMPLETE = (level, serial, label) => {
      return `
        <div class="vacancies-setup-2-level-${level}__item flex items-center font text-16px'">
          <div class="number mr-16px">${serial}</div>
          <div class="label">${label}</div>
        </div>
      `
    }

    const CHOSE_SPACE_VIEW = $(`
      <div class="vacancies__content-setup-2__chose__non flex items-center justify-center flex-1">
        <div class="vacancies__content-setup-2__chose__non__icon icon icon-34px icon-file mr-8px"></div>
        <div class="vacancies__content-setup-2__chose__non__label">露西助理提醒您<br>請先勾選題目</div>
      </div>
    `)
    CHOSE_SPACE_VIEW.appendTo('.vacancies__content-setup-2__chose__container')

    function buildLevel1 () {
      for (const [index, value] of Object.entries(QUESTION_LEVEL_1_LIST)) {        
        const templeteLevel1 = $(LEVEL_TEMPLETE(1, ENGLISH_LABEL.at(index), value))
        templeteLevel1.appendTo('.vacancies-setup-2-level-1__list')
        templeteLevel1.on('click', function () {
          templeteLevel1.addClass('active').siblings().removeClass('active')
          $('.vacancies-setup-2-level-2__list').empty()
          $('.vacancies-setup-2-level-3__list').empty()
          $('.vacancies__content-setup-2__chose__container').empty()
          CHOSE_SPACE_VIEW.appendTo('.vacancies__content-setup-2__chose__container')
          for (const prop of Object.getOwnPropertyNames(data)) delete data[prop]
          data.level1 = { id: index, label: value }
          buildLevel2()
        })
      }
    }

    function buildLevel2 () {
      for (const [index, items] of Object.entries(QUESTION_LEVEL_2_LIST)) {
        const templeteLevel2 = $(LEVEL_TEMPLETE(2, (Number(index) + 1).toString().padStart(2, '0'), items))
        templeteLevel2.appendTo('.vacancies-setup-2-level-2__list')
        templeteLevel2.on('click', function () {
          $(templeteLevel2).addClass('active').siblings().removeClass('active')
          $('.vacancies-setup-2-level-3__list').empty()
          $('.vacancies__content-setup-2__chose__container').empty()
          CHOSE_SPACE_VIEW.appendTo('.vacancies__content-setup-2__chose__container')
          data.level2 = { id: index, label: items }
          buildLevel3()
        })
      }
    }

    function buildLevel3 () {
      for (const [index, item] of Object.entries(QUESTION_LEVEL_3_LIST)) {
        const templeteLevel3 = $(`
          <div class="vacancies-setup-2-level-3__item font text-16px flex items-center" data-item-id="${index}">
            <input id="${index}" type="checkbox">
            <label for="${index}"  class="flex items-center">
              <div class="number mx-16px">Q${ Number(index) + 1 }</div>
              <div class="label">${item}</div>
            </label>
          </div>
        `)
        templeteLevel3.appendTo('.vacancies-setup-2-level-3__list')
        templeteLevel3.find('input').on('change', function () {
          if ($(this).prop('checked')) {
            if ($('.vacancies__content-setup-2__chose__container').find(CHOSE_SPACE_VIEW)) CHOSE_SPACE_VIEW.remove()

            const element = $('.vacancies__content-setup-2__chose__container')
            const templeteLevel4 = $(`
              <div class="vacancies-setup-2-level-4__item flex items-center font text-16px py-16px px-12px" data-item-id="${index}">
                <div class="number"></div>
                <div class="label">
                  <div class="title">${data.level1.label} / ${data.level2.label}</div>
                  <div class="sub">${item}</div>
                </div>
              </div>
            `)
            templeteLevel4.appendTo(element)
          } else {
            const element = $('.vacancies__content-setup-2__chose__container')
            element.find(`[data-item-id="${index}"]`).remove()
          }
          
          if (!$('.vacancies__content-setup-2__chose__container').find('.vacancies-setup-2-level-4__item').length) {
            CHOSE_SPACE_VIEW.appendTo('.vacancies__content-setup-2__chose__container')
            $(".vacancies__content-setup-2__chose__container").sortable('destroy')
          } else $(".vacancies__content-setup-2__chose__container").sortable()
        })
      }
    }

    buildLevel1()

    $('.vacancies__content-setup-2__chose__button').on('click', function () {
      questopmPopup()
    })

    const questopmPopup = () => {
      const templete = $(`
        <div class="pop__wrap">
          <div class="pop__container flex flex-col">
            <div class="pop__top flex items-center">
              <div class="pop__icon mr-12px icon icon-18px icon-notification"></div>
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
        $('.pop__content__textarea__count').text(`${$('.pop__content__textarea textarea').val().length} / 200`)
      })
  
      templete.find('.pop__close').on('click', function () {
        templete.fadeOut(200, function() { $(this).remove() })
        togglePopupView(false)
      })
  
      templete.find('.pop__confirm').on('click', function () {
        templete.fadeOut(200, function() { $(this).remove() })
        togglePopupView(false)
      })
    }
  }

  // 職缺 opening-setup-3
  if ($('body').has('#opening-setup-3').length) {
    textareaBuild()

    for (const item of [$('#opening-setup-3-content'), $('#opening-setup-3-condition')]) {
      $(item).next().text(`${$(item).val().length} / 1500`)
    }
  }

  // 方案 plan
  if ($('body').has('#plan').length) {
    $('.plan-buy__wrap').hide()

    $('.plan-buy__detail__close').on('click', function () {
      togglePopupView(false)
      $('.plan-buy__wrap').hide()
    })

    $('.plan-record-all__button.button.black').on('click', function () {
      togglePopupView(true)
      $('.plan-buy__wrap').show()
    })

    $('.plan-buy__detail__button').on('click', function () {
      togglePopupView(false)
      $('.plan-buy__wrap').hide()
      message({ text: '付款完成，已更新為企業版方案！' })
    })
  }
})