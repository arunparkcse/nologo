export interface Perspective {
  slug: string;
  title: string;
  /** Publish date — left blank until editorial confirms one; template hides the badge when empty. */
  date: string;
  excerpt: string;
  image: string;
  body: string[];
}

export const PERSPECTIVES: Perspective[] = [
  {
    slug: 'ai-creativity-and-the-thing-that-still-needs-a-human',
    title: 'AI, Creativity & the Thing That Still Needs a Human',
    date: '',
    excerpt: 'AI can write. AI can design. AI can make a film. So where does that leave creativity? Perhaps the more interesting question isn’t whether AI can create — it clearly can. The question is what makes something worth creating in the first place.',
    image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200&q=80',
    body: [
      'AI can write. AI can design. AI can make a film. AI can give you ten ideas before you’ve finished your coffee. So, where does that leave creativity?',
      'It is a question we’re hearing more and more. And understandably so. The tools are getting better at a dizzying pace. What took a designer hours can now happen in minutes. A rough thought can become a visual. A few lines can become a film. A blank page suddenly has plenty on it. But perhaps the more interesting question isn’t whether AI can create. It clearly can.',
      'The question is: what makes something worth creating in the first place?',
      'That still feels very human to us. Because an idea doesn’t begin with a prompt. It begins with noticing something. A conversation overheard. A strange little detail. A contradiction. A question that won’t go away. A person doing something in a way you’ve never seen before. A feeling you can’t quite explain.',
      'AI can help us explore possibilities. It can help us get past the blank page, test directions, visualise something before we make it, and sometimes surprise us with an idea we hadn’t considered. But creativity isn’t simply the ability to produce options.',
      'It’s the ability to choose. To know why one idea matters more than another. To understand whether something is appropriate for the audience, the context and the moment. To know when something clever is actually distracting. To recognise when a technically perfect image feels completely wrong.',
      'And perhaps most importantly, to care about the person on the other side of the communication. That’s where the human part becomes difficult to replace.',
      'We’ve always believed that good communication begins with good thinking. AI doesn’t change that. If anything, it makes it more important. When everyone can make almost anything, the real differentiator may no longer be the ability to produce. It may be the ability to notice, question, edit and choose.',
      'So yes, we’ll use AI. We’ll experiment with it. Learn from it. Let it challenge the way we work. But we’ll also keep doing some very old-fashioned things. Walking around. Talking to people. Looking closely. Getting things wrong. Arguing about one word. Sitting with an idea until it becomes clearer. And occasionally throwing away ten perfectly good options because the eleventh one feels right.',
      'The tools may change. The need for curiosity doesn’t.'
    ]
  },
  {
    slug: 'shooting-in-the-rural-heartlands-of-india',
    title: 'Shooting in the Rural Heartlands of India',
    date: '',
    excerpt: 'The camera doesn’t always know where the story is. Some of our shoots have taken us a long way from studios, controlled lighting and comfortable production schedules — down roads that don’t quite appear on Google Maps.',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&q=80',
    body: [
      'The camera doesn’t always know where the story is.',
      'Some of our shoots have taken us a long way from studios, controlled lighting and comfortable production schedules. Down roads that don’t quite appear on Google Maps.',
      'Into homes where the camera is a completely unfamiliar object. Across fields where the light changes before you’ve finished setting up. Into communities where people have more important things to do than wait for a filmmaker. And that’s exactly why we love shooting there.',
      'Because when you’re working in rural India, you quickly learn that you can’t control everything. You have to observe. You have to adapt. And, most importantly, you have to wait.',
      'The production plan may say one thing. The place may have other ideas. The person you’re filming may not say the perfect line. The weather may change. The light may disappear. A tractor may decide to become the loudest thing in the world just when you’ve finally got the interview you wanted. You learn to work with it.',
      'More importantly, you learn to stop looking at a place only through the lens of a production. A village isn’t a backdrop. A field isn’t just a beautiful wide shot. A house isn’t just a location. There are people living there. Working there. Raising families there. Negotiating their everyday lives there. And the camera needs to respect that.',
      'Some of the best moments we’ve captured have happened when nobody was “performing”. A woman going about her morning. A child watching the crew from a distance. A farmer explaining something with his hands because words aren’t quite enough. Someone laughing between takes. Those moments can’t really be scripted. That’s perhaps the biggest lesson rural shoots have taught us.',
      'Don’t arrive with the entire film already in your head.',
      'Arrive prepared, of course. Know what you’re looking for. Know what you need. But leave enough room to discover something you didn’t come looking for. Because sometimes the most important frame on a shoot is the one that wasn’t on the shot list. And sometimes, the best thing a filmmaker can do is stop directing and start paying attention.'
    ]
  }
];

export function getPerspectiveBySlug(slug: string): Perspective | undefined {
  return PERSPECTIVES.find(p => p.slug === slug);
}
