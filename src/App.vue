<template>
  <nav>
    <router-link to="/">Main</router-link>
    |
  </nav>
  <router-view />
</template>

<style>
@import "@/styles/colors.css"; /* 색상 변수 정의 CSS 파일 */

body,
html,
#app {
  margin: 0;
  padding: 0;
  height: auto;
}

#app {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
}

#app {
  font-family: "Arial", sans-serif;
  text-align: center;
  background-color: var(--background-primary);
  color: var(--text-primary);
}

header {
  background-color: var(--surface-primary);
  padding: 20px;
  border-bottom: 1px solid var(--border-primary);
  margin-bottom: 20px;
}

h1 {
  color: var(--text-secondary);
}

:root {
  --ivory-100: #756357;
  --ivory-200: #99897d;
  --ivory-300: #b0a797;
  --ivory-400: #cec7b7;
  --ivory-500: #e1ddcb;
  --ivory-600: #e8e6d5;
  --ivory-700: #e9e8df;
  --ivory-800: #f4f3ec;
  --ivory-900: #fefdf6;

  --gray-100: #282828;
  --gray-200: #3c3c3c;
  --gray-300: #505050;
  --gray-400: #646464;
  --gray-500: #787878;
  --gray-600: #8c8c8c;
  --gray-700: #a0a0a0;
  --gray-800: #b4b4b4;
  --gray-900: #c8c8c8;
  --gray-1000: #dcdcdc;

  --red-brown-100: #2a0a0a;
  --red-brown-200: #341414;
  --red-brown-300: #481c15;
  --red-brown-400: #5c3029;
  --red-brown-500: #6a3e37;
  --red-brown-600: #7e524b;
  --red-brown-700: #92665f;
  --red-brown-800: #a67a73;
  --red-brown-900: #ba8e87;
  --red-brown-1000: #cea29b;

  --green-100: #001f0e;
  --green-200: #092918;
  --green-300: #153524;
  --green-400: #1d4831;
  --green-500: #1f5b3a;
  --green-600: #216b43;
  --green-700: #267b4d;
  --green-800: #218850;
  --green-900: #229958;
  --green-1000: #36ad6c;

  --black: #000000;
  --white: #ffffff;

  /* 사용자 지정 색상 정의 */
  --surface-fourth: var(--ivory-700);
  --button-fifth: var(--white);
}
</style>
