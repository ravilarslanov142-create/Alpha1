import React from 'react'
import { motion } from 'framer-motion'

import Picture from './components/Picture'

import logoMark from './assets/logoMark.png'
import appPreview from './assets/appPreview.png'
import qrBookify from './assets/qrBookify.jpeg'
import howStepOneImage from './assets/howStepOne.png'
import howStepTwoImage from './assets/howStepTwo.png'
import howStepThreeImage from './assets/howStepThree.png'
import howStepFourImage from './assets/howStepFour.png'

const sectionRevealVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 }
}

const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.15
        }
    }
}

const heroItemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: 'easeOut' }
    }
}


const howGridVariants = {
    hidden: { },
    visible: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.05
        }
    }
}

const howCardVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: 'easeOut' }
    }
}
class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isMobileMenuOpen: false,
            openFaqId: 'faq1'
        }

        this.pageSections = [
            { id: 'how', label: 'Как работает' },
            { id: 'faq', label: 'FAQ' }
        ]

        this.howSteps = [
            {
                number: '01',
                title: 'Выберите услугу',
                text: 'Откройте Bookify и выберите категорию/город.',
                image: howStepOneImage
            },
            {
                number: '02',
                title: 'Найдите салон',
                text: 'Сравните варианты и откройте карточку.',
                image: howStepTwoImage
            },
            {
                number: '03',
                title: 'Выберите услугу',
                text: 'Укажите услугу и нажмите «Записаться».',
                image: howStepThreeImage
            },
            {
                number: '04',
                title: 'Подтвердите время',
                text: 'Выберите специалиста, дату и слот — готово.',
                image: howStepFourImage
            }
        ]


        this.faqItems = [
            {
                id: 'faq1',
                q: 'Нужно ли звонить в салон после записи?',
                a: 'Нет. После бронирования вы получаете подтверждение, а салон видит запись в системе.'
            },
            {
                id: 'faq2',
                q: 'Как перенести или отменить запись?',
                a: 'В карточке записи выберите действие “Перенести” или “Отменить”. Салон сразу получит обновление.'
            },
            {
                id: 'faq3',
                q: 'Есть ли напоминания о визите?',
                a: 'Да. Мы отправляем подтверждение и напоминание, чтобы вы не пропустили время.'
            },
            {
                id: 'faq4',
                q: 'В каких городах работает сервис?',
                a: 'Мы постепенно расширяемся. В приложении вы увидите доступные города и ближайшие обновления.'
            }
        ]

        this.handleScrollToSection = this.handleScrollToSection.bind(this)
        this.toggleMobileMenu = this.toggleMobileMenu.bind(this)
        this.toggleFaq = this.toggleFaq.bind(this)
    }

    handleScrollToSection(sectionId) {
        const targetElement = document.getElementById(sectionId)
        if (!targetElement) return

        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
        this.setState({ isMobileMenuOpen: false })
    }

    toggleMobileMenu() {
        this.setState((previousState) => ({
            isMobileMenuOpen: !previousState.isMobileMenuOpen
        }))
    }

    toggleFaq(faqId) {
        this.setState((previousState) => ({
            openFaqId: previousState.openFaqId === faqId ? '' : faqId
        }))
    }

    render() {
        return (
            <div className="page">
                <div className="backgroundBlobs" aria-hidden="true">
                    <div className="blob blobOne" />
                    <div className="blob blobTwo" />
                    <div className="blob blobThree" />
                </div>

                {this.renderHeader()}

                <main className="main">
                    {this.renderHero()}
                    {this.renderHowItWorks()}
                    {this.renderFaq()}
                    {this.renderFinalCta()}
                </main>

                {this.renderFooter()}
            </div>
        )
    }

    renderHeader() {
        const { isMobileMenuOpen } = this.state

        return (
            <header className="headerWrap">
                <div className="container">
                    <div className="headerPill">
                        <button
                            className="brandLogoButtonPlain"
                            type="button"
                            onClick={() => this.handleScrollToSection('top')}
                            aria-label="Перейти в начало страницы"
                            title="Bookify"
                        >
                            <Picture
                                src={logoMark}
                                className="brandMarkPlain"
                                alt="Bookify"
                                width="74"
                                height="74"
                                loading="eager"
                            />

                        </button>

                        <nav className="navDesktop" aria-label="Основная навигация">
                            {this.pageSections.map((section) => (
                                <button
                                    key={section.id}
                                    className="navLink"
                                    type="button"
                                    onClick={() => this.handleScrollToSection(section.id)}
                                >
                                    {section.label}
                                </button>
                            ))}
                        </nav>

                        <div className="headerRight">
                            <a className="buttonDark headerCtaDark" href="https://bookify.kz/partnership" target="_blank" rel="noreferrer">
                                Стать партнёром
                            </a>

                            <button
                                type="button"
                                className="mobileMenuButton"
                                onClick={(event) => {
                                    event.preventDefault()
                                    event.stopPropagation()
                                    this.toggleMobileMenu()
                                }}
                                aria-label="Открыть меню"
                                aria-expanded={isMobileMenuOpen}
                                aria-controls="mobileMenu"
                            >
                                <span className="mobileMenuBars" />
                            </button>
                        </div>
                    </div>

                    <div
                        id="mobileMenu"
                        className={isMobileMenuOpen ? 'mobileMenu mobileMenuOpen' : 'mobileMenu'}
                    >
                        <div className="mobileMenuInner" role="dialog" aria-label="Мобильное меню">
                            {this.pageSections.map((section) => (
                                <button
                                    key={section.id}
                                    className="mobileMenuLink"
                                    type="button"
                                    onClick={() => this.handleScrollToSection(section.id)}
                                >
                                    {section.label}
                                </button>
                            ))}

                            <a className="buttonDark mobileMenuCta" href="https://bookify.kz/partnership" target="_blank" rel="noreferrer">
                                Стать партнёром
                            </a>
                        </div>
                    </div>
                </div>
            </header>
        )
    }

    renderHero() {
        return (
            <section className="hero" id="top">
                <div className="container heroGrid">
                    <motion.div
                        className="heroLeft"
                        variants={heroContainerVariants}
                        initial="hidden"
                        animate="visible"
                    >

                        <motion.h1 className="heroTitle" variants={heroItemVariants}>
                            Записывайтесь на услуги онлайн — за пару кликов
                        </motion.h1>

                        <motion.p className="heroSubtitle" variants={heroItemVariants}>
                            Найдите салон рядом, выберите мастера и время, получите напоминание.
                            Без звонков и переписок.
                        </motion.p>

                        <motion.div className="heroActions" variants={heroItemVariants}>
                            <a className="buttonPrimary" href="https://i.bookify.kz/install" target="_blank" rel="noreferrer">
                                Скачать приложение
                            </a>

                            <div className="heroQr" aria-label="QR код для скачивания приложения">
                                <Picture
                                    src={qrBookify}
                                    className="heroQrImage"
                                    alt="QR код для скачивания приложения"
                                    loading="lazy"
                                />
                            </div>
                        </motion.div>

                        <motion.div className="heroMicro" variants={heroItemVariants}>
                            <span className="microDot" />
                            Быстро
                            <span className="microDivider" />
                            Удобно
                            <span className="microDivider" />
                            Прозрачно
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="heroRight"
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
                    >
                        <div className="mockupFloat">

                            <Picture
                                src={appPreview}
                                className="mockupImageClean"
                                alt="Пример интерфейса приложения Bookify"
                                loading="eager" decoding="async" />
                        </div>
                    </motion.div>
                </div>
            </section>
        )
    }

    renderHowItWorks() {
        return (
            <motion.section
                className="section sectionHow"
                id="how"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={sectionRevealVariants}
                transition={{ duration: 0.55, ease: 'easeOut' }}
            >
                <div className="container">
                    <div className="sectionHead">
                        <h2 className="sectionTitle">Как это работает</h2>
                    </div>

                    <motion.div
                        className="howGrid"
                        variants={howGridVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.25 }}
                    >
                        {this.howSteps.map((stepItem) => (
                            <motion.article className="howCard" key={stepItem.number} variants={howCardVariants}>
                                <div className="howTop">
                                    <div className="howBadge" aria-hidden="true">{stepItem.number}</div>
                                    <div className="howTitle">{stepItem.title}</div>
                                    <div className="howText">{stepItem.text}</div>
                                </div>

                                <div className="howImageWrap" aria-label={stepItem.title}>
                                    <Picture
                                        src={stepItem.image}
                                        className="howImage"
                                        alt={stepItem.title}
                                        loading="lazy" decoding="async" />
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>
                </div>
            </motion.section>
        )
    }

    renderFaq() {
        const { openFaqId } = this.state

        return (
            <motion.section
                className="section"
                id="faq"
                variants={sectionRevealVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                <div className="container">
                    <div className="sectionHead">
                        <h2 className="sectionTitle">FAQ</h2>
                    </div>

                    <div className="faq">
                        {this.faqItems.map((faqItem) => {
                            const isOpen = openFaqId === faqItem.id
                            return (
                                <div key={faqItem.id} className={isOpen ? 'faqItem faqItemOpen' : 'faqItem'}>
                                    <button
                                        type="button"
                                        className="faqQuestion"
                                        onClick={() => this.toggleFaq(faqItem.id)}
                                        aria-expanded={isOpen}
                                        aria-controls={`${faqItem.id}-panel`}
                                    >
                                        <span className="faqQuestionText">{faqItem.q}</span>
                                        <span className={isOpen ? 'faqChevron faqChevronOpen' : 'faqChevron'} aria-hidden="true">
                                            ▾
                                        </span>
                                    </button>

                                    <div
                                        id={`${faqItem.id}-panel`}
                                        className="faqAnswerWrap"
                                        role="region"
                                        aria-label={faqItem.q}
                                    >
                                        <div className="faqAnswer">{faqItem.a}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </motion.section>
        )
    }

    renderFinalCta() {
        return (
            <motion.section
                className="section"
                id="download"
                variants={sectionRevealVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                <div className="container">
                    <div className="finalCtaGlass">
                        <div className="finalCtaLeft">
                            <h2 className="finalCtaTitle">Запишитесь быстрее. Освободите время для важного.</h2>
                            <p className="finalCtaText">
                                Удобный выбор слотов, подтверждение и напоминания — всё в одном месте.
                            </p>
                        </div>

                        <div className="finalCtaRight">
                            <a className="buttonPrimary finalCtaButton" href="https://i.bookify.kz/install" target="_blank" rel="noreferrer">
                                Скачать приложение
                            </a>
                            <div className="finalCtaNote">
                                Ссылки на сторы добавим после публикации. Сейчас — дизайн и структура.
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>
        )
    }

    renderFooter() {
        return (
            <footer className="footerBar">
                <div className="container">
                    <div className="footerBarInner">
                        <div className="footerLeft">
                            <div className="footerCopy">
                                © 2026 TOO «SARY GROUP» — Все права защищены.
                            </div>
                        </div>

                        <div className="footerCenter">
                            <div className="footerCompanyLine">TOO «SARY GROUP»</div>
                            <div className="footerBinLine">БИН: 240440023071</div>
                        </div>

                        <div className="footerRight">
                            <div className="footerLegalLinks">
                                <a
                                    className="footerTextLink"
                                    href="https://bookify.kz/partner/privacy-policy"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Политика конфиденциальности
                                </a>

                                <a
                                    className="footerTextLink footerTextLinkAccent"
                                    href="https://bookify.kz/partner/public-offer"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Публичная оферта
                                </a>
                            </div>
                        </div>

                        <div className="footerIconsRow">
                            <div className="footerIcons">
                                <a
                                    className="footerIconLink"
                                    href="https://www.instagram.com/bookify.kz?igsh=Ymo4N3RyOWFtMDdv&utm_source=qr"
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="Instagram"
                                    title="Instagram"
                                >
                                    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                                        <path
                                            fill="currentColor"
                                            d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm9 2h-9A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4zm-4.5 4a4.5 4.5 0 1 1 0 9a4.5 4.5 0 0 1 0-9zm0 2a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5zM17.8 6.7a1.1 1.1 0 1 1 0 2.2a1.1 1.1 0 0 1 0-2.2z"
                                        />
                                    </svg>
                                </a>

                                <a
                                    className="footerIconLink"
                                    href="https://go.2gis.com/WGm7n"
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="2ГИС"
                                    title="2ГИС"
                                >
                                    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                                        <text
                                            x="12"
                                            y="16"
                                            textAnchor="middle"
                                            fill="currentColor"
                                            fontSize="11"
                                            fontWeight="700"
                                            fontFamily="Arial, sans-serif"
                                        >2GIS</text>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }

}

export default App