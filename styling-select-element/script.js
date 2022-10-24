const presentation = document.querySelector('.presentation');

const select = document.querySelector('select');

presentation.textContent = select.value;

select.addEventListener('change', () => {
    presentation.textContent = select.value;
})