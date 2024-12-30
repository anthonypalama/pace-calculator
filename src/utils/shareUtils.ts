export const handleShare = async (distance: string, time: string) => {
  const text = `🏃‍♂️ Nouveau record personnel sur ${distance} : ${time} ! 🎉`;
  const images = [
    'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
    'https://images.unsplash.com/photo-1649972904349-6e44c42644a7'
  ];
  
  const imageUrl = images[Math.floor(Math.random() * images.length)];
  
  try {
    if (navigator.share) {
      const shareData = {
        title: 'Nouveau Record Personnel',
        text: text,
        url: window.location.href,
        files: [
          await fetch(imageUrl).then(r => r.blob()).then(blob => 
            new File([blob], 'record.jpg', { type: 'image/jpeg' })
          )
        ]
      };
      
      await navigator.share(shareData);
      console.log('Contenu partagé avec succès');
      return { success: true, method: 'share' };
    } else {
      await navigator.clipboard.writeText(text);
      console.log('Texte copié dans le presse-papier');
      return { success: true, method: 'clipboard' };
    }
  } catch (error) {
    console.error('Erreur lors du partage:', error);
    try {
      await navigator.clipboard.writeText(text);
      console.log('Texte copié dans le presse-papier comme solution de repli');
      return { success: true, method: 'clipboard' };
    } catch (clipboardError) {
      console.error('Erreur lors de la copie dans le presse-papier:', clipboardError);
      return { success: false, error: error };
    }
  }
};