import * as yup from 'yup'

export const formSchema = yup.object({
  email: yup.string().email('El correo no es válido').required('El correo es obligatorio'),
  password: yup
    .string()
    .min(3, 'La contraseña debe tener al menos 3 caracteres')
    .required('La contraseña es obligatoria'),
})

export const validateFieldSchema = async (fieldName, value) => {
  const fieldSchema = formSchema.fields[fieldName] // Obtén el esquema del campo
  await fieldSchema.validate(value) // Valida el valor del campo
}

export const validateForm = async (formData) => {
  try {
    await formSchema.validate(formData, { abortEarly: false }) // Valida todo el formulario
    return { isValid: true, errors: {} } // Retorna válido si no hay errores
  } catch (error) {
    const errors = {}
    error.inner.forEach((err) => {
      errors[err.path] = err.message // Mapea los errores
    })
    return { isValid: false, errors } // Retorna los errores encontrados
  }
}
