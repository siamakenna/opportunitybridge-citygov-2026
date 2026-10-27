"""Assemble genuine captured app stills; no continuous-recording claim."""
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
import imageio_ffmpeg, textwrap
base=Path('media/v07-captures');out=Path('media/v07-walkthrough.mp4')
font='/System/Library/Fonts/Supplemental/Arial.ttf'
def F(size):return ImageFont.truetype(font,size)
scenes=[('01-home.png',20,'Find your opening. Bring the evidence.','Opportunity Pulse, Evidence Passport and Advisor Studio connect a real source to a concrete human conversation.','Working v0.7 app captures. This is a screenshot walkthrough, not continuous footage.'),('02-pulse.png',30,'Opportunity Pulse','Advertised Maryland RSS provides discovery metadata. Review levels distinguish leads from approved preparation sources. Dates are snapshots, never a live-status promise.','Discovery does not approve qualifications. Changed or unavailable sources require review.'),('03-passport.png',30,'Evidence Passport','A fictional classroom project connects to a skill, an MPT role task, a proposed artifact and an advisor question. Every field stays editable and local.','A proposed work sample is not completed work, an official credential or eligibility proof.'),('04-story.png',25,'A historical story, with boundaries','NIH documents Gargi Mahadeshwar’s checklist-to-source reporting tool. Our comparable exercise is a recommendation, not her artifact or endorsement.','Institutional deliverables, first-person accounts and unknown career outcomes stay distinct.'),('05-studio.png',30,'Prepare the human conversation','An actual JSON Passport was downloaded and inspected. It retains the real recruitment identity, source review, story attribution and unresolved employer condition.','Ready for human discussion means eligibility remains unknown. No application is sent.'),('06-pilot.png',15,'Test the public benefit honestly','Proposed: 25 adults, 25 reviewed opportunities, 60 days. Economic budget $6,240; no partner is committed. Independent participants n=0.','Software works today. Career benefit, equitable access and faster advising remain hypotheses.')]
writer=imageio_ffmpeg.write_frames(str(out),(1280,800),fps=1,codec='libx264',pix_fmt_in='rgb24',pix_fmt_out='yuv420p',quality=7,macro_block_size=16);writer.send(None)
vtt=['WEBVTT',''];trans=['OpportunityBridge v0.7 — 150-second screenshot walkthrough','Six genuine local working-app captures, assembled as stills. No continuous footage, voice, testimonials or participant findings. Captures show the source dates recorded in the app; they do not renew them.','']
def time(t):return f'{t//3600:02}:{t%3600//60:02}:{t%60:02}.000'
start=0
for i,(name,duration,title,body,caption) in enumerate(scenes):
 canvas=Image.new('RGB',(1280,800),'#17243a');draw=ImageDraw.Draw(canvas);draw.text((32,20),'OPPORTUNITYBRIDGE / KENNY! / v0.7',fill='#d9f2e2',font=F(26));draw.text((32,58),'ACTUAL APP CAPTURES · SCREENSHOT WALKTHROUGH',fill='#d4cbf7',font=F(18));shot=Image.open(base/name).convert('RGB');shot.thumbnail((720,600));canvas.paste(shot,(32+(720-shot.width)//2,100));draw.rounded_rectangle((780,100,1248,690),radius=18,fill='#263952');y=126
 for line in textwrap.wrap(title,24):draw.text((806,y),line,fill='#fff9f0',font=F(31));y+=38
 y+=20
 for line in textwrap.wrap(body,31):draw.text((806,y),line,fill='#e9edf4',font=F(24));y+=33
 draw.text((806,650),f'{i+1}/6 · No independent user outcomes',fill='#d4cbf7',font=F(17));draw.rectangle((0,708,1280,800),fill='#0d182a');y=722
 for line in textwrap.wrap(caption,87):draw.text((32,y),line,fill='white',font=F(26));y+=32
 frame=canvas.tobytes()
 for _ in range(duration):writer.send(frame)
 end=start+duration;vtt += [str(i+1),f'{time(start)} --> {time(end)}',title+'. '+caption,''];trans += [f'{time(start)}–{time(end)} — {title}',body,caption,''];start=end
writer.close();Path('media/v07-walkthrough.vtt').write_text('\n'.join(vtt));Path('media/v07-walkthrough-transcript.txt').write_text('\n'.join(trans)+'\n');print(out,'duration',start,'seconds; six captured stills')
