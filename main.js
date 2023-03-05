
const darkIcon = "ph:moon-stars-duotone";
const lightIcon = "icon-park-outline:dark-mode";
const header = document.querySelector('header');
const switchTheme = document.querySelector('.switch-theme');
const switchThemeSwitcherText = document.querySelector('.switch-theme').querySelector('#current-theme');
let dark = false;

const themeSwitcher = () => {
    const switchThemeSwitcherIcon = document.querySelector('.switch-theme').querySelector('.iconify');
    if (dark) {
        switchThemeSwitcherText.textContent = "Light Mode";
        switchThemeSwitcherIcon.setAttribute("data-icon", lightIcon);
        document.body.setAttribute('theme', 'dark')
    } else {
        switchThemeSwitcherText.textContent = "Dark Mode";
        switchThemeSwitcherIcon.setAttribute("data-icon", darkIcon);
        document.body.setAttribute('theme', 'light')
    }
}

themeSwitcher();

switchTheme.onclick = () => {
    !dark ? dark = true : dark = false;
    themeSwitcher();
}

