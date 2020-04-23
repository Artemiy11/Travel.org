
window.addEventListener('DOMContentLoaded', function() {

    'use strict';
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function(event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for(let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }

    });

    // Timer 

    let deadline = '2018-11-21';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
        seconds = Math.floor((t/1000) % 60),
        minutes = Math.floor((t/1000/60) % 60),
        hours = Math.floor((t/(1000*60*60)));

        return {
            'total' : t,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);
            
        function updateClock() {
            let t = getTimeRemaining(endtime);

            function addZero(num){
                        if(num <= 9) {
                            return '0' + num;
                        } else return num;
                    };

            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }

    }

    setClock('timer', deadline);

    // Modal

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    more.addEventListener('click', function() {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', function() {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

     // Form

    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Мы свяжемся с вами в течении 10 минут!',
        failure: 'Что-то пошло не так...'
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

        statusMessage.classList.add('status');

        form.addEventListener('submit', function(event) {
            event.preventDefault();
            form.appendChild(statusMessage);
            
            function postData() {
                return new Promise(function(resolve, reject) {
                    let request = new XMLHttpRequest();
                    request.open('POST', 'server.php');
                    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

                    let formData = new FormData(form);  //данные, которые ввёл пользователь
                    request.send(formData);             //отправляет данные на сервер

                    request.addEventListener('readystatechange', function() {  //когда форма отправиться
                        if (request.readyState < 4) {
                            resolve();
                        } else if (request.readyState === 4 && request.status === 200) {
                            resolve();
                        } else {
                            reject();
                        }
                    });
                });
            }
            function cleanInput() {
                for (let i = 0; i < input.length; i++) {          //очищаем поля после отправки
                    input[i].value = '';
                }
            }
            postData()
                .then(() => statusMessage.innerHTML = message.loading)
                .then(() => statusMessage.innerHTML = message.success)
                .catch(() => statusMessage.innerHTML = message.failure)
                .then(cleanInput());
        });

    // contact form

    let formContacts = document.querySelector('#form'),
        inputContacts = formContacts.getElementsByTagName('input');

        formContacts.addEventListener('submit', function(event) {
            event.preventDefault();
            formContacts.appendChild(statusMessage);

            let request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            let formData = new FormData(formContacts);
            // let obj = formData.forEach(function(key, value) {
            //     obj[key] = value;
            // });
            request.send(formData);

            request.addEventListener('readystatechange', function() {  //когда форма отправиться
                if (request.readyState < 4) {
                    statusMessage.innerHTML = message.loading;
                } else if (request.readyState === 4 && request.status === 200) {
                    statusMessage.innerHTML = message.success;
                } else {
                    statusMessage.innerHTML = message.failure;
                }
            });

            for (let i = 0; i < inputContacts.length; i++) {          //очищаем поля после отправки
                inputContacts[i].value = '';
            }
        });

    // slider

    let sliderIndex = 1, // видимая картинка
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    showSlides(sliderIndex);

    function showSlides() {
        if (sliderIndex > slides.length) {
            sliderIndex = 1;
        }
        if (sliderIndex < 1) {
            sliderIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none');
        dots.forEach((item) => item.classList.remove('dot-active'));

        slides[sliderIndex - 1].style.display = 'block';
        dots[sliderIndex - 1].classList.add('dot-active');
    }

    function plusSlide(n) {
        showSlides(sliderIndex += n);
    }

    prev.addEventListener('click', function() {
        setTimeout(function() {plusSlide(-1);}, 400);
    });

    next.addEventListener('click', function() {
        setTimeout(function() {plusSlide(1);}, 400);
    });

    function currentSlide(n) {
        showSlides(sliderIndex = n);
    }

    dotsWrap.addEventListener('click', function(event) {
        for (let i = 0; i < dots.length; i++) {
            if (event.target.classList.contains('dot') && event.target == dots[i]) {
                currentSlide(i + 1);
            }
        }
    });

    // calc

    let persons = document.querySelectorAll('.counter-block-input') [0],
        restDays = document.querySelectorAll('.counter-block-input') [1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        restDaysSum = 0,
        total = 0;

    totalValue.innerHTML = 0 + '₽';

    persons.addEventListener('change', function() {
        if (persons.value != '' && restDays.value != '') {
            personsSum = +this.value;
            total = (personsSum + restDaysSum)*4000;
    
            if (restDays.value == '') {
                totalValue.innerHTML = 0 + '₽';
            } else {
                totalValue.innerHTML = total + '₽';
            }
        } else {
            totalValue.innerHTML = 0 + "₽";
        }
    });

    restDays.addEventListener('change', function() {
        if (persons.value != '' && restDays.value != '') {
            restDaysSum = +this.value;
            total = (personsSum + restDaysSum)*4000;
    
            if (persons.value == '') {
                totalValue.innerHTML = 0 + '₽';
            } else {
                totalValue.innerHTML = total + '₽';
            }
        } else {
            totalValue.innerHTML = 0 + '₽';
        }
    });

    place.addEventListener('change', function() {
        if (persons.value != '' && restDays.value != '') {
            if (persons.value == '' || restDays.value == '') {
                totalValue.innerHTML = 0 + '₽';
            } else {
                let a = total;
                totalValue.innerHTML = a * this.value + '₽';
            }
        } else {
            totalValue.innerHTML = 0 + '₽';
        }
    });

});

