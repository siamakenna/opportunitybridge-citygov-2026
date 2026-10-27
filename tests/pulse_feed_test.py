import importlib.util,unittest,tempfile,os,json,runpy
from pathlib import Path
from unittest.mock import patch
SCRIPT=Path(__file__).resolve().parents[1]/'scripts/pulse_refresh.py'
spec=importlib.util.spec_from_file_location('pulse_refresh',SCRIPT);mod=importlib.util.module_from_spec(spec);spec.loader.exec_module(mod)
XML='''<rss><channel><item><title>Student Fellow - #26-008996-0007</title><link>https://www.jobapscloud.com/MD/sup/BulPreview.asp?R1=26&amp;R2=008996&amp;R3=0007</link><pubDate>Mon, 26 Oct 2026 15:10:00 EST</pubDate><description><![CDATA[<p><strong>Department:</strong> MPT</p><p><strong>Filing Deadline:</strong> 11/9/2026 5:00:00 PM</p><p><strong>Salary:</strong> $15.50/hour.</p><p><strong>HR Analyst:</strong> Example Name.</p><p><strong>Work Location:</strong> Baltimore County</p><p>View this Recruitment: Student Fellow</p>]]></description></item></channel></rss>'''
class FeedTests(unittest.TestCase):
 def test_metadata_and_location_are_clean(self):
  r=mod.parse_feed(XML,'2026-10-27T01:00:00+00:00')[0];self.assertEqual(r['location'],'Baltimore County');self.assertEqual(r['pay'],'$15.50/hour');self.assertEqual(r['id'],'26-008996-0007')
 def test_contact_identity_not_retained(self):self.assertNotIn('Example Name',json.dumps(mod.parse_feed(XML,'2026-10-27T01:00:00+00:00')))
 def test_deadline_uses_actual_maryland_offset(self):self.assertEqual(mod.parse_feed(XML,'2026-10-27T01:00:00+00:00')[0]['deadline'],'2026-11-09T17:00:00-05:00')
 def test_publisher_timestamp_is_preserved(self):self.assertEqual(mod.parse_feed(XML,'2026-10-27T01:00:00+00:00')[0]['publisherDate'],'Mon, 26 Oct 2026 15:10:00 EST')
 def test_mismatched_id_and_template_are_excluded(self):
  self.assertEqual(mod.parse_feed(XML.replace('#26-008996-0007','#26-008996-0008'),'2026-10-27T01:00:00+00:00'),[]);self.assertIsNone(mod.canonical('https://www.jobapscloud.com/MD/sup/BulPreview.asp?R1=AF&R2=000000&R3=001'))
 def test_fetch_failure_retains_prior_success_not_new_verification(self):
  with tempfile.TemporaryDirectory() as folder:
   old=os.getcwd()
   try:
    os.chdir(folder);Path('data').mkdir();Path('data/pulse.json').write_text(json.dumps({'lastSuccessAt':'2026-10-25T00:00:00+00:00','records':[]}))
    with patch.dict(os.environ,{'GITHUB_ACTIONS':'false'}),patch('subprocess.run',side_effect=OSError('fixture failure')):runpy.run_path(str(SCRIPT),run_name='__main__')
    r=json.loads(Path('data/pulse.json').read_text());self.assertEqual(r['lastSuccessAt'],'2026-10-25T00:00:00+00:00');self.assertEqual(r['fetchStatus'],'unavailable');self.assertNotIn('verifiedAt',r)
   finally:os.chdir(old)
