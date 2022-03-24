<template>
    <transition name="fade">
        <div class="modal js_modal" v-show="isOpen" @click="onModalClick" ref="modal">
            <div class="modal_inner">
                <a class="modal_close" @click="closeModal">
                    <svg class="modal_closeIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0V0z" fill="none"/><path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/>
                    </svg>
                </a>
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script>
    /**
     * Компонент для создания модальных окон.
     * Открытие и закрытие происходит через генерацию событий (openModal, closeModal) на $root со значением id модалки
     */
    export default {
        name: 'BaseModal',
        props: {
            id: {
                type: String,
                required: true,
            }
        },
        data: () => ({
            isOpen: false,
        }),
        mounted() {
            this.$root.$on('openModal', (id) => {
                if (id === this.id) this.openModal();
            });
            this.$root.$on('closeModal', (id) => {
                if (id === this.id) this.closeModal();
            });
        },
        methods: {
            openModal() {
                this.isOpen = true;
            },
            closeModal() {
                this.isOpen = false;
            },
            onModalClick(event) {
                if (this.$refs.modal === event.target) this.closeModal(); // закрываем модалку по клику в пустоту
            }
        },
    };
</script>

<style lang="scss">
    .modal {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100vh;
        z-index: 9000;
        backdrop-filter: blur(20px);

        &_inner {
            position: relative;
            display: flex;
            flex-flow: column nowrap;
            width: 100%;
            max-width: 640px;
            min-height: 320px;
            padding: 32px;
            border: 2px solid $accentBorderColor;
            border-radius: 14px;
            background: $blockGradient;
        }
        &_close {
            position: absolute;
            top: 4px;
            right: 4px;
            cursor: pointer;
        }
        &_closeIcon {
            width: 24px;
            height: 24px;
            fill: $accentBorderColor;
            transition: 0.2s fill;
        }
        &_close:hover &_closeIcon {
            fill: $textColor;
        }
    }
</style>