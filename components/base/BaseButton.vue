<template>
    <button class="button" @click="$emit('click', $event)">
        <slot></slot>
    </button>
</template>

<script>
    /**
     * Компонент для вывода кнопки
     */
    export default {
        name: 'BaseButton',
    };
</script>

<style lang="scss">
    .button {
        position: relative;
        padding: 8px 32px;
        border: 2px solid $accentBorderColor;
        border-radius: 4px;
        text-transform: uppercase;
        background: $accentGradient;
        color: $textColor;
        font-weight: 600;
        cursor: pointer;
        overflow: hidden;
        // Shine:
        &::before {
            content: '';
            display: block;
            position: absolute;
            background: rgba(255, 255, 255, 0.5);
            width: 60px;
            height: 100%;
            top: 0;
            left: 0;
            filter: blur(30px);
            transform: translateX(-120px) skewX(-15deg);
        }
        &::after {
            content: '';
            display: block;
            position: absolute;
            background: rgba(255, 255, 255, 0.2);
            width: 30px;
            height: 100%;
            top: 0;
            left: 0;
            filter: blur(5px);
            transform: translateX(-60px) skewX(-47deg);
        }
        &:hover {
            &::before,
            &::after {
                left: calc(100% + 140px);
                transition: 0.6s;
            }
            .base-item-giveaway__bg-circle-first {
                bottom: 80%;
            }
            .base-item-giveaway__bg-circle-second {
                top: 80%;
            }
            .base-item-giveaway__link-icon {
                transform: translateX(50%);
            }
        }
    }
</style>