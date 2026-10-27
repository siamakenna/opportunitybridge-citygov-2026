"""Assemble genuine captured app stills; no continuous-recording claim."""
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
import imageio_ffmpeg, textwrap
base=Path('media/v08-captures');out=Path('media/v08-walkthrough.mp4')
font='/System/Library/Fonts/Supplemental/Arial.ttf'
def F(size):return ImageFont.truetype(font,size)
scenes=[
('01-home.png',20,'More than one career path','Career Quest connects discovery to three playable civic exercises, portable evidence and a next human conversation. Free, untimed and no account.','Genuine working-app screenshots. This is a captioned screenshot sequence, not continuous footage.'),
('02-board.png',20,'Choose a meaningful quest','Source Detective, an accessibility repair sandbox and Career Evidence Builder work in any order. Conventional tools remain available without playing.','Progress records learning actions, never hiring worthiness. Replays do not farm rewards.'),
('03-source.png',30,'Source Detective','A frozen Maryland source supports a thirty-credit substitution for six administrative months. The learner must also recognize missing applicant facts and reject a hiring guarantee.','Five source-understanding checks must pass. Frozen evidence is not a current eligibility decision.'),
('04-accessibility.png',35,'Build an Accessibility Artifact','Repair a fictional library page: map text, contrast, heading order, link purpose and a form label. The actual preview changes and a self-contained HTML exercise can be downloaded.','Only five predefined exercise conditions are checked. This does not certify WCAG compliance.'),
('05-builder.png',30,'Build evidence, not assumptions','Connect fictional experience to a skill, a reviewed MPT task, a proposed artifact and a human question. Empty fields or an invalid source cannot complete this quest.','The actual Passport retains quest version, source snapshot and unresolved questions. All fields remain editable.'),
('06-courses.png',25,'Discover a different next step','The INTERNAL false-positive bug is fixed. Three reviewed learning resources supplement official sources. Short paid projects show an honest empty state and a directory fallback.','Courses are training. Directories are not individual openings. Publisher metadata does not approve qualifications.'),
('07-studio.png',20,'Bring a question to a human','Download an advisor packet with actual source identity and evidence. Proposed campus-municipal pilot: sixty days, twenty-five adults, no committed host.','Independent participants n=0. Career benefit and return engagement remain unmeasured hypotheses.')]

writer=imageio_ffmpeg.write_frames(str(out),(1280,800),fps=1,codec='libx264',pix_fmt_in='rgb24',pix_fmt_out='yuv420p',quality=7,macro_block_size=16);writer.send(None)
vtt=['WEBVTT',''];trans=['OpportunityBridge v0.8 — 180-second screenshot walkthrough','Seven genuine local working-app captures, assembled as stills. No continuous footage, voice, testimonials or participant findings. Captures show the source dates recorded in the app; they do not renew them.','']
def time(t):return f'{t//3600:02}:{t%3600//60:02}:{t%60:02}.000'
start=0
for i,(name,duration,title,body,caption) in enumerate(scenes):
 canvas=Image.new('RGB',(1280,800),'#17243a');draw=ImageDraw.Draw(canvas);draw.text((32,20),'OPPORTUNITYBRIDGE / KENNY! / v0.8',fill='#d9f2e2',font=F(26));draw.text((32,58),'ACTUAL LOCAL APP CAPTURES · SCREENSHOT WALKTHROUGH',fill='#d4cbf7',font=F(18));shot=Image.open(base/name).convert('RGB');shot.thumbnail((720,600));canvas.paste(shot,(32+(720-shot.width)//2,100));draw.rounded_rectangle((780,100,1248,690),radius=18,fill='#263952');y=126
 for line in textwrap.wrap(title,24):draw.text((806,y),line,fill='#fff9f0',font=F(31));y+=38
 y+=20
 for line in textwrap.wrap(body,31):draw.text((806,y),line,fill='#e9edf4',font=F(24));y+=33
 draw.text((806,650),f'{i+1}/7 · No independent user outcomes',fill='#d4cbf7',font=F(17));draw.rectangle((0,708,1280,800),fill='#0d182a');y=722
 for line in textwrap.wrap(caption,87):draw.text((32,y),line,fill='white',font=F(26));y+=32
 frame=canvas.tobytes()
 for _ in range(duration):writer.send(frame)
 end=start+duration;vtt += [str(i+1),f'{time(start)} --> {time(end)}',title+'. '+caption,''];trans += [f'{time(start)}–{time(end)} — {title}',body,caption,''];start=end
writer.close();Path('media/v08-walkthrough.vtt').write_text('\n'.join(vtt));Path('media/v08-walkthrough-transcript.txt').write_text('\n'.join(trans)+'\n');print(out,'duration',start,'seconds; seven captured stills')
