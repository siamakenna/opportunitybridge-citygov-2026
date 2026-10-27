"""Assemble genuine captured app stills; no continuous-recording claim."""
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
import imageio_ffmpeg, textwrap
base=Path('media/v081-captures');out=Path('media/v081-walkthrough.mp4')
font='/System/Library/Fonts/Supplemental/Arial.ttf'
def F(size):return ImageFont.truetype(font,size)
scenes=[
('01-home.png',20,'A direction, with evidence','Career exploration can leave learners unsure how classroom work relates to a real public-service source. Career Constellation connects an opening, a learning action, an evidence draft and a human next step.','Seven genuine working-app captures. Captioned screenshot sequence, not continuous footage.'),
('02-constellation.png',25,'More than one route','Choose Coding and data. Compare accessible civic content with public-service evidence. All six nodes open real content or a working action. The text/list equivalent offers the same route.','Suggested learning routes, not eligibility predictions. No step blocks official opportunity information.'),
('03-discovery.png',25,'Find a genuine source','Reviewed MPT Student Fellow sources are distinct from internships. Five individual learning resources and three directories support exploration. Explained interest ordering can switch to neutral date or title order.','Courses are training. Directories are not individual openings. Unknown pay stays unknown.'),
('04-source.png',30,'Try Source Detective','On the alternative administrative route, inspect a frozen official case. Thirty accredited credits may substitute for six administrative months. Recognize missing facts and reject an unsupported hiring guarantee.','All five checks must pass. A learning record does not establish current employer eligibility.'),
('05-passport.png',25,'Make the reasoning portable','Bring the completed fictional exercise into Evidence Passport. Its source, proposed artifact and human question remain inspectable. Actual JSON downloads retain the quest snapshot and unresolved employer conditions.','This is a fictional evidence plan, not a credential, completed professional project or verified applicant record.'),
('06-return.png',25,'Save by choice, then return','Saving is off by default. Explicitly capture a fictional draft, opt in, reload and see one checked learning record and two saved sources. Export Journey JSON or delete saved progress in one action.','Local device only. Imported records stay unverified and earn no XP until replay. Never save private applicant information.'),
('07-advisor.png',30,'Prepare a human conversation','Download an actual advisor handoff with source-linked questions. The proposed sixty-day pilot needs consenting adults and willing campus/municipal hosts. A fifteen-minute adult study kit is ready but unsent.','Independent participants n=0. Internal mock 87/100. Career, equity and return benefits remain unmeasured.')]


writer=imageio_ffmpeg.write_frames(str(out),(1280,800),fps=1,codec='libx264',pix_fmt_in='rgb24',pix_fmt_out='yuv420p',quality=7,macro_block_size=16);writer.send(None)
vtt=['WEBVTT',''];trans=['OpportunityBridge v0.8.1 — 180-second screenshot walkthrough','Seven genuine local working-app captures, assembled as stills. No continuous footage, voice, testimonials or participant findings. Captures show the source dates recorded in the app; they do not renew them.','']
def time(t):return f'{t//3600:02}:{t%3600//60:02}:{t%60:02}.000'
start=0
for i,(name,duration,title,body,caption) in enumerate(scenes):
 canvas=Image.new('RGB',(1280,800),'#17243a');draw=ImageDraw.Draw(canvas);draw.text((32,20),'OPPORTUNITYBRIDGE / KENNY! / v0.8.1',fill='#d9f2e2',font=F(26));draw.text((32,58),'ACTUAL LOCAL APP CAPTURES · SCREENSHOT WALKTHROUGH',fill='#d4cbf7',font=F(18));shot=Image.open(base/name).convert('RGB');shot.thumbnail((720,600));canvas.paste(shot,(32+(720-shot.width)//2,100));draw.rounded_rectangle((780,100,1248,690),radius=18,fill='#263952');y=126
 for line in textwrap.wrap(title,24):draw.text((806,y),line,fill='#fff9f0',font=F(31));y+=38
 y+=20
 for line in textwrap.wrap(body,31):draw.text((806,y),line,fill='#e9edf4',font=F(24));y+=33
 draw.text((806,650),f'{i+1}/7 · No independent user outcomes',fill='#d4cbf7',font=F(17));draw.rectangle((0,708,1280,800),fill='#0d182a');y=722
 for line in textwrap.wrap(caption,87):draw.text((32,y),line,fill='white',font=F(26));y+=32
 frame=canvas.tobytes()
 for _ in range(duration):writer.send(frame)
 end=start+duration;vtt += [str(i+1),f'{time(start)} --> {time(end)}',title+'. '+caption,''];trans += [f'{time(start)}–{time(end)} — {title}',body,caption,''];start=end
writer.close();Path('media/v081-walkthrough.vtt').write_text('\n'.join(vtt));Path('media/v081-walkthrough-transcript.txt').write_text('\n'.join(trans)+'\n');print(out,'duration',start,'seconds; seven captured stills')
