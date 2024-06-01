import { GetServerSideProps } from 'next'
import { useContext, useEffect, useState } from 'react'

import { api } from '@services/api'

import { parseCookies } from 'nookies'

import { CarsDTO } from '@dtos/CarsDTO'

import { CardAmin } from '@components/Card/CardAmin'

import styles from '../../styles/pages/Admin.module.scss'

import { AddCarModal } from '@components/Modal/AddCarModal'
import { GlobalContext } from '@contexts/GlobalContext'
import { AppError } from '@utils/AppError'

export interface GetCarsResponse {
  cars: CarsDTO[]
}

export default function Admin() {
  const [cars, setCars] = useState<GetCarsResponse>()
  const [loading, setLoading] = useState(false)
  const { signOut } = useContext(GlobalContext)

  useEffect(() => {
    const getFetchCars = async () => {
      try {
        setLoading(true)
        const { data } = await api.get<GetCarsResponse>('/cars')
        setCars(data)
      } catch (error) {
        const isAppError = error instanceof AppError
        const title = isAppError
          ? `${error.message}. Fazer login novamente.`
          : 'Não foi possível entrar. Tente novamente mais tarde.'
        alert(title)
        signOut()
      } finally {
        setLoading(false)
      }
    }
    getFetchCars()
  }, [signOut])

  const orderCar = cars?.cars.sort((a, b) => {
    return Number(b.originalValue) - Number(a.originalValue)
  })

  if (loading) {
    return <h1>Loading</h1>
  }

  return (
    <main>
      <section>
        <div className={styles.app_layout_content}>
          <div className={styles.app_layout_content_cards}>
            <AddCarModal />
            {
              orderCar?.map((car) => <CardAmin key={car.id} car={car} />)}
          </div>
        </div>
      </section>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'nextauth.user': user } = parseCookies(ctx)

  if (!user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
