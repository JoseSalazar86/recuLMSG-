document.addEventListener('DOMContentLoaded', () => {
    // Testimonios de ejemplo
    const testimonials = [
        { text: "Excelente trabajo, superó nuestras expectativas.", author: "Antonio" },
        { text: "Muy profesional, entregado a tiempo y con alta calidad", author: "Nerea" },
        { text: "Creativo y atento a los detalles, ¡recomendado!", author: "Jorge" },
        { text: "Un profesional increíble, su trabajo superó mis expectativas", author: "Juan" },
        { text: "Rápido, eficiente y con gran creatividad. ¡Totalmente recomendado!", author: "Paco" },
        { text: "Excelente calidad y trato al cliente muy bueno a la hora de trabajar en tu proyecto", author: "Yanira" }
    ];

    let currentIndex = 0;
    const testimonialsContainer = document.querySelector('.testimonials__container');
    const prevButton = document.querySelector('.testimonials__nav-button#prevButton');
    const nextButton = document.querySelector('.testimonials__nav-button#nextButton');
    const deleteButton = document.querySelector('.testimonials__delete-button');
    const form = document.querySelector('#testimonial-form');
    const textarea = document.querySelector('#testimonial-text');
    const input = document.querySelector('#author-name');

    // Crear testimonio
    function createTestimonial(testimonial) {
        const article = document.createElement('article');
        article.classList.add('testimonio');  // BEM

        const paragraph = document.createElement('p');
        paragraph.classList.add('testimonio__texto');  // BEM
        paragraph.textContent = `"${testimonial.text}"`;
        article.appendChild(paragraph);

        const cite = document.createElement('cite');
        cite.textContent = `- ${testimonial.author}`;
        article.appendChild(cite);

        return article;
    }

    // Actualizar los testimonios en el contenedor
    function updateTestimonials() {
        testimonialsContainer.innerHTML = '';  // Limpiar el contenedor
        for (let i = 0; i < 3; i++) {
            let index = (currentIndex + i) % testimonials.length;
            testimonialsContainer.appendChild(createTestimonial(testimonials[index]));
        }
    }

    // Botón de Anterior
    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 3 + testimonials.length) % testimonials.length;
        updateTestimonials();
    });

    // Botón de Siguiente
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 3) % testimonials.length;
        updateTestimonials();
    });

    // Eliminar el último testimonio
    deleteButton.addEventListener('click', () => {
        if (testimonials.length > 0) {
            testimonials.pop();  // Eliminar el último testimonio
            currentIndex = Math.max(0, currentIndex - 3);  // Evitar ir a un índice negativo
            updateTestimonials();
        }
    });

    // Añadir nuevo testimonio
    form.addEventListener('submit', (e) => {
        e.preventDefault();  // Prevenir el comportamiento por defecto

        const newTestimonial = {
            text: textarea.value,
            author: input.value
        };

        testimonials.push(newTestimonial);  // Añadir el nuevo testimonio
        currentIndex = Math.max(0, testimonials.length - 3);  // Asegurar que se muestre el testimonio agregado
        updateTestimonials();  // Actualizar la vista

        // Limpiar el formulario
        textarea.value = '';
        input.value = '';
    });

    // Inicializar la vista
    updateTestimonials();
});
