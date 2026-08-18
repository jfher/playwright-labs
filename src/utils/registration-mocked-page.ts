import { Page } from "@playwright/test";

export async function loadRegistrationPage(page: Page) {
    await page.setContent(`
        <!DOCTYPE html>
        <html>
        <body>
            <h1>Registration</h1>
            <form id="registration-form"
                <label>
                    Name
                    <input id="name">
                </label>

                <label>
                    Email
                    <input id="email">
                </label>

                <label>
                    Role
                    <select id="role">
                        <option value="">
                            Select
                        </option>
                        <option value="qa">
                            QA
                        </option>
                        <option value="developer">
                            Developer
                        </option>
                        <option value="manager">
                            Manager
                        </option>
                    </select>
                </label>

                <button type="submit">
                    Register
                </button>

            </form>

            <p id="result"></p>

            <script>
                document
                    .querySelector(
                        '#registration-form'
                    )
                    .addEventListener(
                        'submit',
                        (event) => {
                            event.preventDefault();

                            if(document.querySelector('#email').value === 'invalid-email') {
                                document
                                    .querySelector(
                                        '#result'
                                    )
                                    .textContent =
                                    'Invalid email';
                            } else {
                                document
                                    .querySelector(
                                        '#result'
                                    )
                                    .textContent =
                                    'Registration successful';
                                }

                            
                        }
                    );
            </script>
        </body>
        </html>
    `);
}