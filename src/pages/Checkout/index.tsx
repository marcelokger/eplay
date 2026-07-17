// o uso do <></> foi necessario pois estamos passando mais de um children dentro do componente card
// para fazer as validações é necessário instalar os pacotes: npm install --save yup formik

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Navigate } from 'react-router-dom'

import Button from '../../components/Button'
import Card from '../../components/Card'
import { usePurchaseMutation } from '../../services/api'
import type { RootReducer } from '../../store'
import { clear } from '../../store/reducers/cart'
import { getTotalPrice, parseToBrl } from '../../utils'

import creditCard from '../../assets/images/cartao.png'
import barCode from '../../assets/images/boleto.png'
import * as Styles from './styles'
import { IMaskInput } from 'react-imask'

type Installment = {
  quantity: number
  amount: number
  formattedAmount: string
}

const Checkout = () => {
  const [payWithCard, setPayWithCard] = useState(false)
  const [purchase, { data, isSuccess, isLoading }] = usePurchaseMutation()
  const { items } = useSelector((state: RootReducer) => state.cart)
  const [installments, setInstallments] = useState<Installment[]>([])

  const dispatch = useDispatch()

  const totalPrice = getTotalPrice(items)

  const form = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      cpf: '',
      deliveryEmail: '',
      confirmDeliveryEmail: '',
      cardOwner: '',
      cpfCardOwner: '',
      cardDisplayName: '',
      cardNumber: '',
      expiresMonth: '',
      expiresYear: '',
      cardCode: '',
      installments: 1,
    },
    validationSchema: Yup.object({
      fullName: Yup.string().min(5, 'Digite o nome completo').required('O campo é obrigatório'),
      email: Yup.string().email('E-mail inválido').required('O campo é obrigatório'),
      cpf: Yup.string()
        .min(14, 'O campo precisa ter 14 caracteres')
        .max(14, 'O campo precisa ter 14 caracteres')
        .required('O campo é obrigatório'),
      deliveryEmail: Yup.string().email('E-mail inválido').required('O campo é obrigatório'),
      confirmDeliveryEmail: Yup.string()
        .oneOf([Yup.ref('deliveryEmail')], 'Os e-mails são diferentes')
        .required('O campo é obrigatório'),

      cardOwner: Yup.string().when((_values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema,
      ),
      cpfCardOwner: Yup.string().when((_values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema,
      ),
      cardDisplayName: Yup.string().when((_values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema,
      ),
      cardNumber: Yup.string().when((_values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema,
      ),
      expiresMonth: Yup.string().when((_values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema,
      ),
      expiresYear: Yup.string().when((_values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema,
      ),
      cardCode: Yup.string().when((_values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema,
      ),
      installments: Yup.number().when((_values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema,
      ),
    }),
    onSubmit: (values) => {
      purchase({
        billing: {
          document: values.cpf.replace(/\D/g, ''),
          email: values.email,
          name: values.fullName,
        },
        delivery: {
          email: values.deliveryEmail,
        },
        payment: {
          installments: values.installments,
          card: {
            active: payWithCard,
            code: Number(values.cardCode),
            name: values.cardDisplayName,
            number: values.cardNumber,
            owner: {
              document: values.cpfCardOwner.replace(/\D/g, ''),
              name: values.cardOwner,
            },
            expires: {
              month: Number(values.expiresMonth),
              year: Number(values.expiresYear),
            },
          },
        },
        products: items.map((item) => ({
          id: item.id,
          price: item.prices.current as number,
        })),
      })
    },
  })

  const checkInputHasError = (fieldName: string) => {
    const isTouched = fieldName in form.touched
    const isInvalid = fieldName in form.touched
    const hasError = isTouched && isInvalid

    return hasError
  }

  useEffect(() => {
    const calculatorInstallments = () => {
      const installmentsArray: Installment[] = []

      for (let i = 1; i <= 6; i++) {
        installmentsArray.push({
          quantity: i,
          amount: totalPrice / i,
          formattedAmount: parseToBrl(totalPrice / i),
        })
      }

      return installmentsArray
    }

    if (totalPrice > 0) {
      setInstallments(calculatorInstallments())
    }
  }, [totalPrice])

  useEffect(() => {
    if (isSuccess) {
      dispatch(clear())
    }
  }, [isSuccess, dispatch])

  if (items.length === 0 && !isSuccess) {
    return <Navigate to="/" />
  }

  return (
    <div className="container">
      {isSuccess && data ? (
        <Card title="Muito obrigado!">
          <>
            <p>
              É com satisfação que informamos que recebemos seu pedido com sucesso! <br />
              Abaixo estão os detalhes da sua compra: <br />
              Número do pedido: {data.orderId} <br />
              Forma de pagamento: {payWithCard ? 'Cartão de crédito' : 'Boleto Bancário'}
            </p>
            <p style={{ marginTop: '24px' }}>
              Caso tenha optado pelo pagamento via boleto bancário, lembre-se de que a confirmação
              pode levar até 3 dias úteis. Após a aprovação do pagamento, enviaremos um e-mail
              contendo o código de ativação do jogo.
            </p>
            <p style={{ marginTop: '24px' }}>
              Se você optou pelo pagamento com cartão de crédito, a liberação do código de ativação
              ocorrerá após a aprovação da transação pela operadora do cartão. Você receberá o
              código no e-mail cadastrado em nossa loja
            </p>
            <p style={{ marginTop: '24px' }}>
              Pedimos que verifique sua caixa de entrada e a pasta de spam para garantir que receba
              nossa comunicação. Caso tenha alguma dúvida ou necessite de mais informações, por
              favor, entre em contato conosco através dos nossos canais de atendimento ao cliente.
            </p>
            <p style={{ marginTop: '24px' }}>
              Agradecemos por escolher a EPLAY e esperamos que desfrute do seu jogo!
            </p>
          </>
        </Card>
      ) : (
        <form onSubmit={form.handleSubmit}>
          <Card title="Dados de Cobrança">
            <>
              <Styles.Row>
                <Styles.InputGroup>
                  <label htmlFor="fullName">Nome Completo</label>
                  {/* <input id="fullName" type="text" /> */}{' '}
                  {/* Alteraçaões nos inputs do formulario */}
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    value={form.values.fullName}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    className={checkInputHasError('fullName') ? 'error' : ''}
                  />
                </Styles.InputGroup>
                <Styles.InputGroup>
                  <label htmlFor="email">E-mail</label>
                  {/* <input id="email" type="email" /> */}
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={form.values.email}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    className={checkInputHasError('email') ? 'error' : ''}
                  />
                </Styles.InputGroup>
                <Styles.InputGroup>
                  <label htmlFor="cpf">CPF</label>
                  <IMaskInput
                    id="cpf"
                    type="text"
                    name="cpf"
                    mask="000.000.000-00" // Máscara do CPF
                    value={form.values.cpf}
                    // Usamos onAccept para atualizar o Formik com o valor mascarado
                    onAccept={(value) => form.setFieldValue('cpf', value)}
                    // onBlur ainda é importante para o Formik registrar o campo como "touched"
                    onBlur={form.handleBlur}
                    className={checkInputHasError('cpf') ? 'error' : ''}
                  />
                </Styles.InputGroup>
              </Styles.Row>
              <h3 style={{ marginTop: '24px' }}>Dados de Entrega - Conteúdo Digital</h3>
              <Styles.Row>
                <Styles.InputGroup>
                  <label htmlFor="deliveryEmail">E-mail</label>
                  {/* <input id="deliveryEmail" type="email" /> */}
                  <input
                    id="deliveryEmail"
                    type="email"
                    name="deliveryEmail"
                    value={form.values.deliveryEmail}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    className={checkInputHasError('deliveryEmail') ? 'error' : ''}
                  />
                </Styles.InputGroup>
                <Styles.InputGroup>
                  <label htmlFor="confirmDeliveryEmail">Confirme o E-mail</label>
                  <input
                    id="confirmDeliveryEmail"
                    type="email"
                    name="confirmDeliveryEmail"
                    value={form.values.confirmDeliveryEmail}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    className={checkInputHasError('confirmDeliveryEmail') ? 'error' : ''}
                  />
                </Styles.InputGroup>
              </Styles.Row>
            </>
          </Card>

          <Card title="Pagamento">
            <>
              <Styles.TabButton
                type="button"
                isActive={!payWithCard}
                onClick={() => setPayWithCard(false)}
              >
                <img src={barCode} alt="Boleto" />
                Boleto Bancário
              </Styles.TabButton>
              <Styles.TabButton
                type="button"
                isActive={payWithCard}
                onClick={() => setPayWithCard(true)}
              >
                <img src={creditCard} alt="Cartão de crédito" />
                Cartão de crédito
              </Styles.TabButton>
              <div style={{ marginTop: '24px' }}>
                {payWithCard ? (
                  <>
                    <Styles.Row>
                      <Styles.InputGroup>
                        <label htmlFor="cardOwner">Nome do titular do cartão</label>
                        <input
                          id="cardOwner"
                          type="text"
                          name="cardOwner"
                          value={form.values.cardOwner}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          className={checkInputHasError('cardOwner') ? 'error' : ''}
                        />
                      </Styles.InputGroup>
                      <Styles.InputGroup>
                        <label htmlFor="cpfCardOwner">CPF do titular do cartão</label>
                        <IMaskInput
                          id="cpfCardOwner"
                          type="text"
                          name="cpfCardOwner"
                          mask="000.000.000-00" // Máscara do CPF
                          value={form.values.cpfCardOwner}
                          // Usamos onAccept para atualizar o Formik com o valor mascarado
                          onAccept={(value) => form.setFieldValue('cpfCardOwner', value)}
                          // onBlur ainda é importante para o Formik registrar o campo como "touched"
                          onBlur={form.handleBlur}
                          className={checkInputHasError('cpfCardOwner') ? 'error' : ''}
                        />
                      </Styles.InputGroup>
                    </Styles.Row>
                    <Styles.Row marginTop="24px">
                      <Styles.InputGroup>
                        <label htmlFor="cardDisplayName">Nome no cartão</label>
                        <input
                          id="cardDisplayName"
                          type="text"
                          name="cardDisplayName"
                          value={form.values.cardDisplayName}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          className={checkInputHasError('cardDisplayName') ? 'error' : ''}
                        />
                      </Styles.InputGroup>
                      <Styles.InputGroup>
                        <label htmlFor="cardNumber">Número do cartão</label>
                        <IMaskInput
                          id="cardNumber"
                          type="text"
                          name="cardNumber"
                          mask="0000 0000 0000 0000" // Esta é a máscara
                          value={form.values.cardNumber}
                          // O onAccept vai atualizar o Formik com o valor já mascarado (com espaços)
                          onAccept={(value) => form.setFieldValue('cardNumber', value)}
                          onBlur={form.handleBlur}
                          className={checkInputHasError('cardNumber') ? 'error' : ''}
                        />
                      </Styles.InputGroup>
                      <Styles.InputGroup maxWidth="123px">
                        <label htmlFor="expiresYear">Mês de vencimento</label>
                        <IMaskInput
                          id="expiresYear"
                          type="text"
                          name="expiresMonth"
                          mask="00" // Esta é a máscara
                          value={form.values.expiresMonth}
                          onAccept={(value) => form.setFieldValue('expiresMonth', value)}
                          onBlur={form.handleBlur}
                          className={checkInputHasError('expiresMonth') ? 'error' : ''}
                        />
                      </Styles.InputGroup>
                      <Styles.InputGroup maxWidth="123px">
                        <label htmlFor="expiresYear">Ano de vencimento</label>
                        <IMaskInput
                          id="expiresYear"
                          type="text"
                          name="expiresYear"
                          mask="00" // Esta é a máscara
                          value={form.values.expiresYear}
                          onAccept={(value) => form.setFieldValue('expiresYear', value)}
                          // O onAccept substitui o onChange do Formik para o IMaskInput
                          // {/*onChange={form.handleChange}*/} //
                          onBlur={form.handleBlur}
                          className={checkInputHasError('expiresYear') ? 'error' : ''}
                        />
                      </Styles.InputGroup>
                      <Styles.InputGroup maxWidth="48px">
                        <label htmlFor="cardCode">CVV</label>
                        <IMaskInput
                          id="cardCode"
                          type="text"
                          name="cardCode"
                          mask="000" // Esta é a máscara
                          value={form.values.cardCode}
                          onAccept={(value) => form.setFieldValue('cardCode', value)}
                          onBlur={form.handleBlur}
                          className={checkInputHasError('cardCode') ? 'error' : ''}
                        />
                      </Styles.InputGroup>
                    </Styles.Row>
                    <Styles.Row marginTop="24px">
                      <Styles.InputGroup maxWidth="150px">
                        <label htmlFor="installments">Parcelamento</label>
                        <select
                          name="installments"
                          id="installments"
                          value={form.values.installments}
                          onChange={form.handleChange}
                          onBlur={form.handleBlur}
                          className={checkInputHasError('installments') ? 'error' : ''}
                        >
                          {installments.map((installment) => (
                            <option value={installment.quantity} key={installment.quantity}>
                              {installment.quantity}x de {installment.formattedAmount}
                            </option>
                          ))}
                        </select>
                      </Styles.InputGroup>
                    </Styles.Row>
                  </>
                ) : (
                  <p>
                    Ao optar por essa forma de pagamento, é importante lembrar que a confimação pode
                    levar até 3 dias úteis, devidos aos prazos estabelecidos pelas instituições
                    financeiras. Portanto, a liberação do código de ativação do jogo adquirido
                    ocorrerá somente após a aprovação do pagamento do boleto.
                  </p>
                )}
              </div>
            </>
          </Card>
          <Button disabled={isLoading} type="submit" title="Clique aqui para finalizar a compra">
            {isLoading ? 'Finalizando compra...' : 'Finalizar compra'}
          </Button>
        </form>
      )}
    </div>
  )
}
export default Checkout
