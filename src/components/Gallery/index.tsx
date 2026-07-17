import { useState } from 'react'

import Section from '../Section'

import playImg from '../../assets/images/play.png'
import zoomImg from '../../assets/images/zoom.png'
import closeIcon from '../../assets/images/close-icon.png'

import * as Styles from './styles'

type Props = {
  defaultCover: string
  name: string
  items: GalleryItem[]
}

interface ModalState extends GalleryItem {
  isVisible: boolean
}

const Gallery = ({ defaultCover, name, items }: Props) => {
  const [modal, setModal] = useState<ModalState>({
    isVisible: false,
    type: 'image',
    url: '',
  })

  const getMediaCover = (Item: GalleryItem) => {
    if (Item.type === 'image') return Item.url
    return defaultCover
  }

  const getMediaIcon = (Item: GalleryItem) => {
    if (Item.type === 'image') return zoomImg
    return playImg
  }

  const closeModal = () => {
    setModal({ isVisible: false, type: 'image', url: '' })
  }

  return (
    <>
      <Section title="Galeria" background="black">
        <Styles.Items>
          {items.map((media, index) => (
            <Styles.Item
              key={media.url}
              onClick={() => {
                setModal({
                  isVisible: true,
                  type: media.type,
                  url: media.url,
                })
              }}
            >
              <img src={getMediaCover(media)} alt={`Mídia ${index + 1} de ${name}`} />
              <Styles.Action>
                <img src={getMediaIcon(media)} alt="Clique aqui para aumentar a mídia" />
              </Styles.Action>
            </Styles.Item>
          ))}
        </Styles.Items>
      </Section>

      <Styles.Modal className={modal.isVisible ? 'is-visible' : ''}>
        <Styles.ModalContent>
          <header>
            <h4>{name}</h4>
            <img
              src={closeIcon}
              alt="Icone de fechar"
              onClick={() => {
                closeModal()
              }}
            />
          </header>
          {modal.type === 'image' ? (
            <img src={modal.url} />
          ) : (
            <iframe src={modal.url} frameBorder="0" />
          )}
        </Styles.ModalContent>
        <div
          className="overlay"
          onClick={() => {
            closeModal()
          }}
        ></div>
      </Styles.Modal>
    </>
  )
}
export default Gallery
