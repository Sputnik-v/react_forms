import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';

// const validate = values => {
//     const errors ={};

//     if (!values.name) {
//         errors.name = 'Это обязательнок поле!';
//     } else if (values.name.length < 2 || values.name.length > 15) {
//         errors.name = 'Минимум 2 символа, Максимум 15 символов!'
//     }

//     if (!values.email) {
//         errors.email = 'Это обязательное поле!'
//     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
//         errors.email = 'Неправильный email адресс!';
//     }

//     return errors;
// }

const MyTextInput = ({label, ...props}) => {

    const [field, meta] = useField(props);

    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            <input {...props} {...field}/>
            {meta.touched && meta.error ? (
                <div className='error'>{meta.error}</div>
            ) : null}
        </>
    )
}

const MyCheckBox = ({children, ...props}) => {

    const [field, meta] = useField({...props, type: 'checkbox'});

    return (
        <>
            <label className='checkbox'>
                <input type="checkbox" {...props} {...field}/>
                {children}
            </label>
            
            {meta.touched && meta.error ? (
                <div className='error'>{meta.error}</div>
            ) : null}
        </>
    )
}

const CustomForm = () => {

    // const formik = useFormik({
    //     initialValues: {
    //         name: '',
    //         email: '',
    //         amount: 0,
    //         currency: '',
    //         text: '',
    //         terms: false
    //     },
    //     validationSchema: Yup.object({
    //         name: Yup.string()
    //                 .min(2, 'Минимум 2 символа')
    //                 .max(10, 'Максимально 10 символов')
    //                 .required('Обязательное поле!'),
    //         email: Yup.string()
    //                 .email('Неправильный email адресс')
    //                 .required('Обязательное поле'),
    //         amount: Yup.number()
    //                 .min(5, 'Не менне 5!')
    //                 .required('Обязательное поле!'),
    //         currency: Yup.string()
    //                     .required('Выберите валюту'),
    //         text: Yup. string()
    //                 .min(10, 'Не менее 10 символов'),
    //         terms: Yup.boolean() 
    //                 .required('Необходимо согласие')
    //                 .oneOf([true], 'Необходимо согласие')                  
    //     }),
    //     onSubmit: values => console.log(JSON.stringify(values, null, 2))
    // })

    return (
        <Formik 
            initialValues={{
                name: '',
                email: '',
                amount: 0,
                currency: '',
                text: '',
                terms: false
            }}
            validationSchema={Yup.object({
                name: Yup.string()
                        .min(2, 'Минимум 2 символа')
                        .max(10, 'Максимально 10 символов')
                        .required('Обязательное поле!'),
                email: Yup.string()
                        .email('Неправильный email адресс')
                        .required('Обязательное поле'),
                amount: Yup.number()
                        .min(5, 'Не менне 5!')
                        .required('Обязательное поле!'),
                currency: Yup.string()
                            .required('Выберите валюту'),
                text: Yup. string()
                        .min(10, 'Не менее 10 символов'),
                terms: Yup.boolean() 
                        .required('Необходимо согласие')
                        .oneOf([true], 'Необходимо согласие')                  
            })}
            onSubmit={values => console.log(JSON.stringify(values, null, 2))}>

            <Form className="form">
                <h2>Отправить пожертвование</h2>
                <MyTextInput 
                    label="Ваше имя"
                    id="name"
                    name="name"
                    type="text"              
                />
                
                <MyTextInput 
                    label="Ваша почта"
                    id="email"
                    name="email"
                    type="email"
                />
                <label htmlFor="amount">Количество</label>
                <Field
                    id="amount"
                    name="amount"
                    type="number"/>
                <ErrorMessage className='error' name='amount' component='div'/>
                <label htmlFor="currency">Валюта</label>
                <Field
                    id="currency"
                    name="currency"
                    as="select">
                        <option value="">Выберите валюту</option>
                        <option value="USD">USD</option>
                        <option value="UAH">UAH</option>
                        <option value="RUB">RUB</option>
                </Field>
                <ErrorMessage className='error' name='currency' component='div'/>
                <label htmlFor="text">Ваше сообщение</label>
                <Field 
                    id="text"
                    name="text"
                    as="textarea"
                />
                <ErrorMessage className='error' name='text' component='div'/>
                
                <MyCheckBox name="terms">Соглашаетесь с политикой конфиденциальности?</MyCheckBox>
                <button type="submit">Отправить</button>
            </Form>
        </Formik>
    )
}

export default CustomForm;