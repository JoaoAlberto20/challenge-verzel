import { Card } from '@components/Card'

import { api } from '@services/api'

import { CarsDTO } from '@dtos/CarsDTO'
import { useEffect, useState } from 'react'
import styles from '../styles/pages/Home.module.scss'

export interface GetCarsResponse {
  cars: CarsDTO[]
}

export default function Home() {
  const [cars, setCars] = useState<GetCarsResponse>()

  useEffect(() => {
    const getFetchCars = async () => {
      try {
        const { data } = await api.get<GetCarsResponse>('/cars')
        console.log(orderCar)

        setCars(data)
      } catch (error) {
        console.log(error)
      }
    }
    getFetchCars()
  }, [])

  const orderCar = cars?.cars.sort((a, b) => {
    return Number(b.originalValue) - Number(a.originalValue)
  })



  return (
    <main>
      <section>
        <div className={styles.app_layout_home_content}>
          <div className={styles.app_layout_home_content_cards}>
            {orderCar?.map((car) => (
              <Card key={car.id} car={car} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
