import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/data.js';


const registerTemplate = (onSubmit, errorMsg, invalidEmail, invalidPass, invalidRe) => html`<div class="row space-top">
    <div class="col-md-12">
        <h1>Register New User</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            ${errorMsg ? html`<div class="form-group">
                <p>${errorMsg}</p>
            </div>` : ''}
            <div class="form-group">
                <label class="form-control-label" for="email">Email</label>
                <input class=${'form-control' + (invalidEmail ? ' is-invalid' : '')} id="email" type="text"
                    name="email">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="password">Password</label>
                <input class=${'form-control' + (invalidPass ? ' is-invalid' : '')} id="password" type="password"
                    name="password">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="repeatPassword">Repeat</label>
                <input class=${'form-control' + (invalidRe ? ' is-invalid' : '')} id="repeatPassword" type="password"
                    name="repeatPassword">
            </div>
            <input type="submit" class="btn btn-primary" value="Register" />
        </div>
    </div>
</form>`;


export async function registerPage(ctx) {
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const repeatPassword = formData.get('repeatPassword').trim();

        if (email == '' || password == '' || repeatPassword == '') {
            return ctx.render(registerTemplate(onSubmit, 'All fields are required!', email == '', password == '', repeatPassword == ''));
        }
        if (password != repeatPassword) {
            return ctx.render(registerTemplate(onSubmit, 'Passwords don\'t match client!', false, true, true));
        }

        await register(email, password, repeatPassword);
        
        ctx.setUserNav();
        ctx.page.redirect('/');
    }
}